const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let files = [];

function askForFile(index) {
  console.log(`\n⚡ Silakan drag & drop file JSON ke-${index}, lalu tekan Enter...`);

  rl.once("line", (filePath) => {
    filePath = filePath.trim().replace(/^"|"$/g, ""); // Bersihkan tanda kutip

    if (validateJsonFile(filePath)) {
      files.push(filePath);

      if (files.length < 2) {
        askForFile(2); // Minta file kedua setelah file pertama valid
      } else {
        mergeFiles(); // Langsung merge setelah file kedua valid
      }
    } else {
      askForFile(index); // Minta ulang jika tidak valid
    }
  });
}

function validateJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) throw new Error("❌ File tidak ditemukan!");
    if (path.extname(filePath) !== ".json") throw new Error("❌ File harus berformat JSON!");

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!jsonData.dependencies && !jsonData.devDependencies) {
      throw new Error("❌ File tidak memiliki dependencies atau devDependencies!");
    }

    console.log("✅ File valid!");
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

function mergeFiles() {
  console.log("\n🔄 Sedang menggabungkan file...\n");

  const oldPackage = JSON.parse(fs.readFileSync(files[0], "utf8"));
  const newPackage = JSON.parse(fs.readFileSync(files[1], "utf8"));

  oldPackage.dependencies = { ...oldPackage.dependencies, ...newPackage.dependencies };
  oldPackage.devDependencies = { ...oldPackage.devDependencies, ...newPackage.devDependencies };

  // Hapus `devDependencies` jika kosong
  if (Object.keys(oldPackage.devDependencies).length === 0) {
    delete oldPackage.devDependencies;
  }

  const outputFolder = "./output";
  const outputFile = path.join(outputFolder, "package.json");

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  showProgress(() => {
    fs.writeFileSync(outputFile, JSON.stringify(oldPackage, null, 2));
    console.log(`✅ File berhasil digabung! Cek hasilnya di: ${outputFile}`);
    rl.close();
  });
}

function showProgress(callback) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    const bar = "█".repeat(progress / 5) + "-".repeat(20 - progress / 5);
    process.stdout.write(`\r🔄 Proses merge: [${bar}] ${progress}%`);
    
    if (progress >= 100) {
      clearInterval(interval);
      console.log("\n✅ Merge selesai!\n");
      callback();
    }
  }, 200);
}

// Mulai dengan meminta file pertama
askForFile(1);
