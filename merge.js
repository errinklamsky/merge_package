const fs = require("fs");
const readline = require("readline");

// Fungsi untuk mendapatkan versi terbaru dari dua dependency
function getLatestVersion(version1, version2) {
    if (!version1) return version2;
    if (!version2) return version1;
    
    // Bandingkan versi secara semantik
    const semver = require("semver");
    return semver.gt(semver.coerce(version1), semver.coerce(version2)) ? version1 : version2;
}

// Fungsi untuk membaca file JSON
function readJsonFile(prompt) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`${prompt} (Drag & Drop file, lalu tekan Enter): `, (filePath) => {
            filePath = filePath.trim().replace(/^"(.*)"$/, "$1"); // Bersihkan path dari quotes
            try {
                const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
                console.log(`✅ File valid: ${filePath}\n`);
                resolve(jsonData);
            } catch (error) {
                console.error(`❌ Error membaca file: ${error.message}`);
                reject(error);
            } finally {
                rl.close();
            }
        });
    });
}

// Fungsi untuk menggabungkan dependencies dengan memilih versi terbaru
function mergeDependencies(oldDeps, newDeps) {
    const merged = { ...oldDeps };

    for (const [pkg, version] of Object.entries(newDeps)) {
        merged[pkg] = getLatestVersion(merged[pkg], version);
    }

    return merged;
}

(async () => {
    try {
        const oldPackage = await readJsonFile("Masukkan file package.json pertama");
        const newPackage = await readJsonFile("Masukkan file package.json kedua");

        // Proses merge dependencies dan devDependencies dengan memilih versi terbaru
        const mergedPackage = {
            ...oldPackage,
            dependencies: mergeDependencies(oldPackage.dependencies || {}, newPackage.dependencies || {}),
            devDependencies: mergeDependencies(oldPackage.devDependencies || {}, newPackage.devDependencies || {})
        };

        // Hapus devDependencies jika kosong
        if (Object.keys(mergedPackage.devDependencies).length === 0) {
            delete mergedPackage.devDependencies;
        }

        // Simpan ke output/package.json
        const outputPath = "output/package.json";
        fs.mkdirSync("output", { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(mergedPackage, null, 2));

        console.log(`\n✅ Merge selesai! File tersimpan di: ${outputPath}`);
    } catch (error) {
        console.error("❌ Proses merge gagal:", error.message);
    }
})();
