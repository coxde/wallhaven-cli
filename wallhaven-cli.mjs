import { Command } from 'commander';
import https from 'https';
import fs from 'fs';
import path from 'path';

const program = new Command();
let url = 'https://wallhaven.cc/api/v1/search?';

const categoryPicker = function (category) {
    const categoryCodes = {
        all: '111',
        anime: '010',
        general: '100',
        people: '001',
        ga: '110',
        gp: '101',
    };

    return categoryCodes[category];
};

const purityPicker = function (purity) {
    const purityCodes = {
        sfw: '100',
        sketchy: '010',
        nsfw: '001',
        ws: '110',
        wn: '101',
        sn: '011',
        all: '111',
    };

    return purityCodes[purity];
};

const imageDownloader = function (url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((json) => {
            json.data.forEach((imageObject) => {
                let imageUrl = imageObject.path;

                // actually download the images
                https.get(imageUrl, (res) => {
                    const fileName = path.basename(imageUrl);
                    const writeStream = fs.createWriteStream(fileName);

                    if (res.statusCode !== 200) {
                        console.error(
                            `Failed to download image ${fileName}. Status code: ${res.statusCode}`,
                        );
                        return;
                    }

                    res.pipe(writeStream);

                    writeStream.on('finish', () => {
                        writeStream.close();
                        console.log(`Download Completed: ${fileName}`);
                    });
                });
            });
        })
        .catch((error) => {
            console.error(
                'There was a problem fetching the image metadata:',
                error,
            );
        });
};

program
    .name('wallhaven-cli')
    .description('A CLI tool to download images from wallhaven')
    .version('0.2.1');

// download command
program
    .command('download')
    .description('Download images from wallhaven')
    .argument('<pages>', 'image pagination (24 images per page)')
    .option('-a, --api [value]', 'api key')
    .option(
        '-c, --category <value>',
        'image category (options: "all", "general", "anime", "people", "ga", "gp")',
        'all',
    )
    .option(
        '-p, --purity <value>',
        'image purity (options: "all", "sfw", "sketchy", "nsfw", "ws", "wn", "sn")',
        'sfw',
    )
    .option(
        '-s, --sorting <value>',
        'image sorting method (options: "date_added", "relevance", "random", "views", "favorites", "toplist")',
        'toplist',
    )
    .option(
        '-o, --order <value>',
        'image sorting order (options: desc, asc)',
        'desc',
    )
    .option(
        '-t, --topRange <value>',
        'image time range (only for toplist) (options: 1d, 3d, 1w, 1M, 3M, 6M, 1y)',
        '1M',
    )
    .option(
        '-r, --ratio [value]',
        'image ratio (options: 16x9, 16x10, 4x3, 1x1)',
    )

    .action((pages, options, command) => {
        // generate the final url
        url += `&categories=${categoryPicker(
            options.category,
        )}&purity=${purityPicker(options.purity)}&sorting=${
            options.sorting
        }&order=${options.order}&topRange=${options.topRange}&page=${pages}`;

        // add ratio to url if exists
        if (options.ratio) url += `&ratios=${options.ratio}`;

        // add api key to url if exists
        if (options.api) url += `&apikey=${options.api}`;

        // download images
        imageDownloader(url);
    });

program.parse();
