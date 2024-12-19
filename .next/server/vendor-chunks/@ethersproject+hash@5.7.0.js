"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@ethersproject+hash@5.7.0";
exports.ids = ["vendor-chunks/@ethersproject+hash@5.7.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@ethersproject+hash@5.7.0/node_modules/@ethersproject/hash/lib.esm/message.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@ethersproject+hash@5.7.0/node_modules/@ethersproject/hash/lib.esm/message.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hashMessage: () => (/* binding */ hashMessage),\n/* harmony export */   messagePrefix: () => (/* binding */ messagePrefix)\n/* harmony export */ });\n/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ \"(ssr)/./node_modules/.pnpm/@ethersproject+bytes@5.7.0/node_modules/@ethersproject/bytes/lib.esm/index.js\");\n/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/keccak256 */ \"(ssr)/./node_modules/.pnpm/@ethersproject+keccak256@5.7.0/node_modules/@ethersproject/keccak256/lib.esm/index.js\");\n/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/strings */ \"(ssr)/./node_modules/.pnpm/@ethersproject+strings@5.7.0/node_modules/@ethersproject/strings/lib.esm/utf8.js\");\n\n\n\nconst messagePrefix = \"\\x19Ethereum Signed Message:\\n\";\nfunction hashMessage(message) {\n    if (typeof (message) === \"string\") {\n        message = (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__.toUtf8Bytes)(message);\n    }\n    return (0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_1__.keccak256)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.concat)([\n        (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__.toUtf8Bytes)(messagePrefix),\n        (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__.toUtf8Bytes)(String(message.length)),\n        message\n    ]));\n}\n//# sourceMappingURL=message.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQGV0aGVyc3Byb2plY3QraGFzaEA1LjcuMC9ub2RlX21vZHVsZXMvQGV0aGVyc3Byb2plY3QvaGFzaC9saWIuZXNtL21lc3NhZ2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBOEM7QUFDTztBQUNBO0FBQzlDO0FBQ0E7QUFDUDtBQUNBLGtCQUFrQixtRUFBVztBQUM3QjtBQUNBLFdBQVcsbUVBQVMsQ0FBQyw0REFBTTtBQUMzQixRQUFRLG1FQUFXO0FBQ25CLFFBQVEsbUVBQVc7QUFDbkI7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL2l3by1wbGF0Zm9ybS9ub2RlX21vZHVsZXMvLnBucG0vQGV0aGVyc3Byb2plY3QraGFzaEA1LjcuMC9ub2RlX21vZHVsZXMvQGV0aGVyc3Byb2plY3QvaGFzaC9saWIuZXNtL21lc3NhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uY2F0IH0gZnJvbSBcIkBldGhlcnNwcm9qZWN0L2J5dGVzXCI7XG5pbXBvcnQgeyBrZWNjYWsyNTYgfSBmcm9tIFwiQGV0aGVyc3Byb2plY3Qva2VjY2FrMjU2XCI7XG5pbXBvcnQgeyB0b1V0ZjhCeXRlcyB9IGZyb20gXCJAZXRoZXJzcHJvamVjdC9zdHJpbmdzXCI7XG5leHBvcnQgY29uc3QgbWVzc2FnZVByZWZpeCA9IFwiXFx4MTlFdGhlcmV1bSBTaWduZWQgTWVzc2FnZTpcXG5cIjtcbmV4cG9ydCBmdW5jdGlvbiBoYXNoTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgaWYgKHR5cGVvZiAobWVzc2FnZSkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgbWVzc2FnZSA9IHRvVXRmOEJ5dGVzKG1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4ga2VjY2FrMjU2KGNvbmNhdChbXG4gICAgICAgIHRvVXRmOEJ5dGVzKG1lc3NhZ2VQcmVmaXgpLFxuICAgICAgICB0b1V0ZjhCeXRlcyhTdHJpbmcobWVzc2FnZS5sZW5ndGgpKSxcbiAgICAgICAgbWVzc2FnZVxuICAgIF0pKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lc3NhZ2UuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@ethersproject+hash@5.7.0/node_modules/@ethersproject/hash/lib.esm/message.js\n");

/***/ })

};
;