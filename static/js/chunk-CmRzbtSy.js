var s=Object.defineProperty;var r=(o,e,n)=>e in o?s(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n;var t=(o,e,n)=>r(o,typeof e!="symbol"?e+"":e,n);import{c as a}from"./chunk-Co4l0zX2.js";class g{constructor(){t(this,"optionsStore",a)}async changeAcceptTerms(...e){return this.optionsStore.changeAcceptTerms(...e)}async changeAskToSendFlows(...e){return this.optionsStore.changeAskToSendFlows(...e)}async changeAskToSendFunnels(...e){return this.optionsStore.changeAskToSendFunnels(...e)}async changeAskToSendSingleItem(...e){return this.optionsStore.changeAskToSendSingleItem(...e)}async changeHideItemsBar(...e){return this.optionsStore.changeHideItemsBar(...e)}async changeShowOnlyFavoritesOnItemsBar(...e){return this.optionsStore.changeShowOnlyFavoritesOnItemsBar(...e)}async changeTheme(...e){return this.optionsStore.changeTheme(...e)}async changeWhatsappAutoScroll(...e){return this.optionsStore.changeWhatsappAutoScroll(...e)}}class c{constructor(e){this.repository=e}execute(e){if(typeof e!="boolean")throw new Error("ToggleDarkMode: A boolean must be provided");this.repository.changeTheme(e?"dark":"light")}}function p(o){const e=new c(o);return e.execute.bind(e)}export{g as C,p as u};
