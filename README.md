<h1 align="center">
	wallhaven-cli</a>
</h1>

A CLI tool to download images from [wallhaven.cc](https://wallhaven.cc/)

## 📦 Installation

1. Make sure you have installed [Node.js](https://nodejs.org/) and [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Clone this repository or download source code from [release](https://github.com/coxde/wallhaven-cli/releases) page
3. Run `npm install` to install dependencies
4. Run `npm install -g .` to install wallhaven-cli
5. Run `wallhaven-cli` to use wallhaven-cli

## ⚙️ Usage

```bash
Usage: wallhaven-cli [options] [command]

A CLI tool to download images from wallhaven

Options:
  -V, --version       output the version number
  -h, --help          display help for command

Commands:
  download [options]  Download images from wallhaven
  help [command]      display help for command
```

```bash
Usage: wallhaven-cli download [options] <pages>

Download images from wallhaven

Arguments:
  pages                   image pagination (24 images per page)

Options:
  -a, --api [value]       api key
  -c, --category <value>  image category (options: "all", "general", "anime", "people", "ga", "gp") (default: "all")
  -p, --purity <value>    image purity (options: "all", "sfw", "sketchy", "nsfw", "ws", "wn", "sn") (default: "sfw")
  -s, --sorting <value>   image sorting method (options: "date_added", "relevance", "random", "views", "favorites", "toplist")
                          (default: "toplist")
  -o, --order <value>     image sorting order (options: desc, asc) (default: "desc")
  -t, --topRange <value>  image time range (only for toplist) (options: 1d, 3d, 1w, 1M, 3M, 6M, 1y) (default: "1M")
  -r, --ratio [value]     image ratio (options: 16x9, 16x10, 4x3, 1x1)
  -h, --help              display help for command
```

## 💝 Thanks to

-   [Wallhaven-dl](https://github.com/saurabhan/Wallhaven-dl)
-   [commander.js](https://github.com/tj/commander.js)
