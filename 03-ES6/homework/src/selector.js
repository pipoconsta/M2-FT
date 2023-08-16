let traverseDomAndCollectElements = function (matchFunc, startEl) {
  let resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  let element = startEl.children; // obtiene los hijos del BODY;

  if(matchFunc(startEl)){
    resultSet.push(startEl) // si devuelve true lo pushea al array de resultado;
  }
  for(let i = 0; i < element.length; i++){
    let result = traverseDomAndCollectElements(matchFunc, 
     element[i]) // va a estar devolviendo arrays;

     resultSet = [...resultSet,...result]; //SPREAD expandir el contenido de un iterable;

  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

let selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0]=== "#") return "id"
  if (selector[0] === ".") return "class"
  if (selector.includes(".")) { // if(selector.indexOf(".") > 0) return "tag.class"
    return "tag.class"
  } else {
    return "tag"
  }
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

let matchFunctionMaker = function (selector) {
  let selectorType = selectorTypeMatcher(selector);

  let matchFunction = function (element){

    if (selectorType === "id") {
       return `#${element.id}` === selector;

    } else if (selectorType === "class") {
      for(let i = 0;i < element.classList.length; i++) {
        if(`.${element.classList[i]}` === selector) {
        return true;
        } 
     } 
    } else if (selectorType === "tag.class") { 
      let [tag,className] = selector.split(".")
      return (matchFunctionMaker(tag)(element) && matchFunctionMaker(`.${className}`)(element))

    } else if (selectorType === "tag") {
      return (element.tagName && element.tagName.toLowerCase() === selector.toLowerCase())

    }
    return false
  }
  return matchFunction;
};

let $ = function (selector) {
  let elements;
  let selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
