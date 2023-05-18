export function alphanumeric(str: string) {
  return str
    .replace(/[^0-9a-z-A-Z ]/g, "")
    .replace(/ +/, " ")
    .trim();
}
export function sysdoublequotes(str: string, sys = "") {
  return sys === "win32" ? str.replace(/"/g, '`"') : str.replace(/"/g, '\\"');
}
export function sysnewline(str: string, sys = "") {
  return sys === "win32"
    ? str.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
    : str;
}
