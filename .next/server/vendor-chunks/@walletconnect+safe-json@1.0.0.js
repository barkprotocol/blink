"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@walletconnect+safe-json@1.0.0";
exports.ids = ["vendor-chunks/@walletconnect+safe-json@1.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@walletconnect+safe-json@1.0.0/node_modules/@walletconnect/safe-json/dist/esm/index.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@walletconnect+safe-json@1.0.0/node_modules/@walletconnect/safe-json/dist/esm/index.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   safeJsonParse: () => (/* binding */ safeJsonParse),\n/* harmony export */   safeJsonStringify: () => (/* binding */ safeJsonStringify)\n/* harmony export */ });\nfunction safeJsonParse(value) {\n    if (typeof value !== \"string\") {\n        throw new Error(`Cannot safe json parse value of type ${typeof value}`);\n    }\n    try {\n        return JSON.parse(value);\n    }\n    catch (_a) {\n        return value;\n    }\n}\nfunction safeJsonStringify(value) {\n    return typeof value === \"string\" ? value : JSON.stringify(value);\n}\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHdhbGxldGNvbm5lY3Qrc2FmZS1qc29uQDEuMC4wL25vZGVfbW9kdWxlcy9Ad2FsbGV0Y29ubmVjdC9zYWZlLWpzb24vZGlzdC9lc20vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTztBQUNQO0FBQ0EsZ0VBQWdFLGFBQWE7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvd29ya3NwYWNlcy9pd28tcGxhdGZvcm0vbm9kZV9tb2R1bGVzLy5wbnBtL0B3YWxsZXRjb25uZWN0K3NhZmUtanNvbkAxLjAuMC9ub2RlX21vZHVsZXMvQHdhbGxldGNvbm5lY3Qvc2FmZS1qc29uL2Rpc3QvZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBzYWZlSnNvblBhcnNlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBzYWZlIGpzb24gcGFyc2UgdmFsdWUgb2YgdHlwZSAke3R5cGVvZiB2YWx1ZX1gKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzYWZlSnNvblN0cmluZ2lmeSh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@walletconnect+safe-json@1.0.0/node_modules/@walletconnect/safe-json/dist/esm/index.js\n");

/***/ })

};
;