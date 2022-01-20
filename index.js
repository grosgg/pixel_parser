let images = [];
let page = 0;

function preload() {
  images.push({
    name: "Hungry Bird",
    file: loadImage("assets/bird.png"),
  });
  images.push({
    name: "Sumo",
    file: loadImage("assets/sumo.png"),
  });
}

function setup() {
  createCanvas(640, 640);
  colorMode(RGB);
  noSmooth();

  images.forEach((img, page) => {
    img.colors = [];
    img.colorPickers = [];
    img.bitmap = [];
    img.file.loadPixels();

    for (let i = 0; i < img.file.pixels.length; i += 4) {
      const pixel = img.file.pixels.slice(i, i + 4).join(",");
      if (!img.colors.includes(pixel)) {
        const colorPicker = createColorPicker(pixel.split(","));
        colorPicker.elt.name = `cp_${page}_${img.colors.length}`;
        colorPicker.elt.addEventListener("change", renderImage, false);
        document.getElementById("pickers").appendChild(colorPicker.elt);

        img.colors.push(pixel);
        img.colorPickers.push(colorPicker);
      }
      img.bitmap.push(img.colors.indexOf(pixel));
    }
  });

  handleKeyPressed(LEFT_ARROW);
}

function draw() {
  background("cream");
  textSize(width * 0.05);

  image(
    images[page].file,
    width * 0.25,
    height * 0.2,
    width * 0.7,
    height * 0.7
  );
  text(
    `${images[page].name}: ${images[page].colors.length} colors`,
    width * 0.01,
    height * 0.11
  );

  for (let i = 0; i < images[page].colors.length; i++) {
    const colorPicker = images[page].colorPickers[i];
    fill(colorPicker.color());
    rect(width * 0.01, height * 0.05 * (i + 3.3), width * 0.04, height * 0.04);
    fill(0);
    text(`: ${i}`, width * 0.07, height * 0.05 * (i + 4));
  }
}

function renderImage(event) {
  const index = event.target.name.match(/\d{1,2}/)[0];
  const img = images[index];

  for (let i = 0; i < img.bitmap.length; i++) {
    const color = img.colorPickers[img.bitmap[i]].color();
    img.file.pixels[i * 4] = color.levels[0];
    img.file.pixels[i * 4 + 1] = color.levels[1];
    img.file.pixels[i * 4 + 2] = color.levels[2];
    img.file.pixels[i * 4 + 3] = color.levels[3];
  }
  img.file.updatePixels();
}

function keyPressed() {
  handleKeyPressed(keyCode);
}

function handleKeyPressed(key) {
  if (key === 83) {
    save(
      "screenshot-" + month() + day() + hour() + minute() + second() + ".jpg"
    );
  }
  if (key === 74) {
    const jsonExport = {
      bitmaps: images.map((img) => ({
        name: img.name,
        bitmap: img.bitmap.join(""),
      })),
    };
    save(
      jsonExport,
      "export-" + month() + day() + hour() + minute() + second() + ".json"
    );
  }

  if (key === LEFT_ARROW || key === RIGHT_ARROW) {
    const colorPickers = document.querySelectorAll("input[type='color']");
    colorPickers.forEach((colorPicker) => {
      colorPicker.classList.add("hidden");
    });

    if (key === LEFT_ARROW) {
      page = max(0, page - 1);
    } else if (key === RIGHT_ARROW) {
      page = min(images.length - 1, page + 1);
    }

    images[page].colorPickers.forEach((colorPicker, i) => {
      colorPicker.elt.classList.remove("hidden");
    });
  }
}
