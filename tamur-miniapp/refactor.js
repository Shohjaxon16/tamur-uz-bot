const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./src').filter(f => f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.css'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace gold with accent
  content = content.replace(/--gold/g, '--accent');
  
  // Replace button text colors that were black on gold to white on black
  content = content.replace(/color: '#111'/g, "color: '#fff'");
  content = content.replace(/color: '#111111'/g, "color: '#ffffff'");
  
  fs.writeFileSync(file, content);
});

console.log('Colors replaced.');
