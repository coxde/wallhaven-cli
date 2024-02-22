import { Command } from 'commander';
const program = new Command();

const categoryPicker = function (category) {
    const categoryCodes = {
        all: '111',
        anime: '010',
        general: '100',
        people: '001',
        ga: '110',
        gp: '101',
    };
    let categoryCode = categoryCodes[category];

    // console.log(`${categoryCode}`);
    return categoryCode;
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
    let purityCode = purityCodes[purity];

    // console.log(`${purityCode}`);
    return purityCode;
};

program
    .name('wallhaven-cli')
    .description('A CLI tool to download images from wallhaven')
    .version('0.1.0');

program
    .command('download')
    .description('Download images from wallhaven')
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
    .option('-o, --order <value>', 'sorting order (options: desc, asc)', 'desc')
    .option(
        '-t, --topRange <value>',
        'time range of top list (options: 1d, 3d, 1w, 1M, 3M, 6M, 1y)',
        '1M',
    )
    .option(
        '-r, --ratio <value>',
        'image ratio (options: 16x9, 16x10, 4x3, 1x1)',
    )
    .option('-P, --pages <value>', 'downloaded image pages', '1')
    .action((options) => {
        if (options.category)
            console.log(
                `Category: ${options.category}, ${categoryPicker(
                    options.category,
                )}`,
            );
        if (options.purity)
            console.log(
                `Purity: ${options.purity}, ${purityPicker(options.purity)}`,
            );
        if (options.pages) console.log(`Pages: ${options.pages}`);
    });

program.parse();
