# Pixel Parser

Play with palette colors on pixel art images.

## Purpose

I am frequently using 8bit Painter on my smartphone to do pixel art on the go. It is easy to export those 16x16 images and send them to my laptop, but I often want to tweak colors afterwards. This is why I created this tool.

It is built for 16x16 or 32x32 images with limited number of colors on the palette and can display well up to 16 different colors.

## Usage

1. Clone the repo
2. Place your images in the `assets` folder
3. In `index.js`, replace the sample images in the `preload` function with yours
4. Run a web server like `http-server` at the root of the repo
5. Visit `localhost:8080` (or the URL provided by the web server)

## Commands

- [Left/Right] to navigate between images
- [S] to save the screenshot
- [J] to export the bitmaps as a JSON file
