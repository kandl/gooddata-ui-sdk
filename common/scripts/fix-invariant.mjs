import fs from "fs"
import path from "path"
import { directory } from "./directory.mjs"

// Recursive function to process files in the directory
function processFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
  
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
  
      if (stats.isFile()) {
        // Process the file
        replaceInvariantImport(filePath);
      } else if (stats.isDirectory()) {
        // Recursively process subdirectories
        processFiles(filePath);
      }
    });
  }
  
  // Function to replace `import invariant from "ts-invariant"` with `import { invariant } from "ts-invariant"`
  function replaceInvariantImport(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${filePath}`, err);
        return;
      }
  
      // Replace the import statement
      const updatedData = data.replace(/import\s+invariant\s+from\s+"ts-invariant";/g, 'import { invariant } from "ts-invariant";');
  
      if (updatedData !== data) {
        // Write the updated content back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
          if (err) {
            console.error(`Error writing file: ${filePath}`, err);
          } else {
            console.log(`File updated: ${filePath}`);
          }
        });
      }
    });
  }
  
  // Start processing files in the specified directory
  processFiles(directory);
