webpackJsonp([4],{pRgA:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i("//Fk"),a=i.n(r),n=i("Dd8w"),o=i.n(n),s=i("NYxO"),c=function(t){if(!t)return"";for(var e=[["а","a"],["б","b"],["в","v"],["г","g"],["д","d"],["е","e"],["ё","yo"],["ж","zh"],["з","z"],["и","i"],["й","y"],["к","k"],["л","l"],["м","m"],["н","n"],["о","o"],["п","p"],["р","r"],["с","s"],["т","t"],["у","u"],["ф","f"],["х","h"],["ц","c"],["ч","ch"],["ш","sh"],["щ","shch"],["ъ",""],["ы","y"],["ь",""],["э","e"],["ю","yu"],["я","ya"],["А","A"],["Б","B"],["В","V"],["Г","G"],["Д","D"],["Е","E"],["Ё","YO"],["Ж","ZH"],["З","Z"],["И","I"],["Й","Y"],["К","K"],["Л","L"],["М","M"],["Н","N"],["О","O"],["П","P"],["Р","R"],["С","S"],["Т","T"],["У","U"],["Ф","F"],["Х","H"],["Ц","C"],["Ч","CH"],["Ш","SH"],["Щ","SHCH"],["Ъ",""],["Ы","Y"],["Ь",""],["Э","E"],["Ю","YU"],["Я","YA"],["a","a"],["b","b"],["c","c"],["d","d"],["e","e"],["f","f"],["g","g"],["h","h"],["i","i"],["j","j"],["k","k"],["l","l"],["m","m"],["n","n"],["o","o"],["p","p"],["q","q"],["r","r"],["s","s"],["t","t"],["u","u"],["v","v"],["w","w"],["x","x"],["y","y"],["z","z"],["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"],["G","G"],["H","H"],["I","I"],["J","J"],["K","K"],["L","L"],["M","M"],["N","N"],["O","O"],["P","P"],["Q","Q"],["R","R"],["S","S"],["T","T"],["U","U"],["V","V"],["W","W"],["X","X"],["Y","Y"],["Z","Z"],[" ","-"],["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["-","-"]],i="",r="",a=0;a<t.length;a++){r=t.charAt(a);for(var n="",o=0;o<e.length;o++)r===e[o][0]&&(n=e[o][1]);i+=n}return i.replace(/[-]{2,}/gim,"-").replace(/\n/gim,"")},l={components:{categoriesList:function(){return i.e(7).then(i.bind(null,"j5lr"))}},created:function(){this.getAllCategories()},data:function(){return{validCat:!1,validSubCat:!1,submitting:!1,category:{title:"",link:"",subcategories:[]},subcategory:{title:"",link:""},edit:!1,info:"",showSnackbar:!1}},computed:o()({},Object(s.c)("СategoriesStore",["categories"]),Object(s.e)(["validatorRules"]),{categoriesOptions:function(){var t=[];return this.categories.slice(0).forEach(function(e){return t.push({value:e,text:e.title})}),t}}),watch:{"category.title":function(t){this.category.link=c(t)},"subcategory.title":function(t){this.subcategory.link=c(t)}},methods:o()({},Object(s.b)("СategoriesStore",["getAllCategories","addNewCategory","editCategory"]),{cyrToLat:c,submitCategory:function(){var t=this;this.submitting=!0,new a.a(function(e,i){if(!t.edit)return t.addNewCategory(o()({},t.category)).then(function(t){return e(t)}).catch(function(t){return i(t)});t.editCategory(o()({},t.category)).then(function(t){return e(t)}).catch(function(t){return i(t)})}).then(function(e){t.showInfo(e),t.resetForm(),t.submitting=!1,t.getAllCategories()}).catch(function(e){t.showInfo(e),t.submitting=!1})},showInfo:function(t){this.info=t.message,this.showSnackbar=!0},chooseCategory:function(t){this.edit=!0,this.category=t},addSubcategory:function(){this.subcategory.title&&this.category.subcategories.push(this.subcategory)},removeSubcategory:function(t){this.category.subcategories=this.category.subcategories.filter(function(e){return e!==t})},resetForm:function(){this.edit=!1,this.category={title:"",link:"",subcategories:[]},this.subcategory={title:"",link:""}}})},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{app:"app","grid-list-md":"grid-list-md"}},[i("v-layout",{attrs:{row:"row",wrap:"wrap"}},[i("v-flex",{attrs:{xs12:"xs12",lg6:"lg6"}},[i("v-card",{staticClass:"px-3 py-3"},[i("v-layout",{attrs:{"justify-between":"justify-between",row:"row"}},[i("v-subheader",{staticClass:"headline pl-0"},[t._v(t._s(t.edit?"Відредагувати рубрику: "+t.category.title:"Додати нову рубрику"))]),t.edit?i("v-btn",{attrs:{icon:"icon",color:"pink",flat:"flat"},nativeOn:{click:function(e){return t.resetForm(e)}}},[i("v-icon",[t._v("restore_page")])],1):t._e()],1),i("v-form",{ref:"categoriesForm",on:{submit:function(e){return e.preventDefault(),t.submitCategory(e)}},model:{value:t.validCat,callback:function(e){t.validCat=e},expression:"validCat"}},[i("v-text-field",{attrs:{label:"Назва рубрики",rules:t.validatorRules,required:"required"},model:{value:t.category.title,callback:function(e){t.$set(t.category,"title",e)},expression:"category.title"}}),i("v-text-field",{attrs:{label:"Назва підрубрики"},model:{value:t.subcategory.title,callback:function(e){t.$set(t.subcategory,"title",e)},expression:"subcategory.title"}}),i("v-btn",{nativeOn:{click:function(e){return t.addSubcategory(e)}}},[t._v("Додати підрубрику")]),i("v-subheader",[t._v("Підрубрики: "+t._s(t.category.subcategories.length))]),i("ul",{staticClass:"ml-3"},t._l(t.category.subcategories,function(e,r){return i("li",{key:r},[i("span",[t._v(t._s(e.title))]),i("v-btn",{attrs:{icon:"icon",flat:"flat"},nativeOn:{click:function(i){t.removeSubcategory(e)}}},[i("v-icon",[t._v("delete")])],1),i("v-divider")],1)})),i("v-btn",{attrs:{type:"submit",disabled:!t.validCat||t.submitting}},[t._v(t._s(t.edit?"Відредагувати":"Додати"))])],1)],1)],1),i("v-flex",{attrs:{xs12:"xs12",lg6:"lg6"}},[i("categories-list",{on:{chooseCategory:t.chooseCategory,showInfo:t.showInfo}})],1)],1),i("v-snackbar",{attrs:{top:"top",right:"right"},model:{value:t.showSnackbar,callback:function(e){t.showSnackbar=e},expression:"showSnackbar"}},[t._v(t._s(t.info)),i("v-btn",{attrs:{flat:"flat",color:"pink"},nativeOn:{click:function(e){t.showSnackbar=!1}}},[t._v("Закрити")])],1)],1)},staticRenderFns:[]},g=i("VU/8")(l,u,!1,null,null,null);e.default=g.exports}});
//# sourceMappingURL=4.365d5b81d0f2e83a4be1.js.map