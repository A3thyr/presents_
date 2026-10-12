export function validateInputValue (str: string): string {
    // Replace comma with dot first, then remove all non-numeric characters except dot
    let n = str.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const parts = n.split('.');
    if (parts.length > 2) {
      n = parts[0] + '.' + parts.slice(1).join('');
    }
  
    return n
  }
  