// Example usage:
const getObjArgs = () => {
  const argv = process.argv.slice(2);
  const obj = {};
  for (let i = 0, intLen = argv.length; i < intLen; i++) {
    const arg = argv[i];
    if (arg.indexOf('-') !== 0) {
      continue;
    }
    const sp =  arg.split('=');
    const key = sp[0].slice(1);
    //                  increment then get value
    //                                        \/
    let val = sp.length > 1 ? sp[1] : argv[++i];
    const arrQ = val.match(/^['"]/);
    
    // Handle wrapped quote
    if (arrQ) {
      const q = arrQ[0];
      const reg = RegExp(`${q}$`);
      const indexEnd = argv.slice(i+1).findIndex(a => reg.test(a));
      if (indexEnd > -1) {
        val = argv.slice(i+1, indexEnd+1).join(' ');
        i += indexEnd;
      }
    }
    obj[key] = val.replace(/(^["']|["']$)/g,''); // replace wrapped quotes
  }
  return obj;
}

module.exports = getObjArgs;