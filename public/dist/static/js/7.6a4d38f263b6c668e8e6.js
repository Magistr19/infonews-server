webpackJsonp([7],{OSkE:function(e,t){},j5lr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("Dd8w"),i=n.n(o),s=n("NYxO"),r={computed:Object(s.c)("СategoriesStore",["categories"]),methods:i()({},Object(s.b)("СategoriesStore",["removeCategory","getAllCategories"]),{chooseCategory:function(e){this.$emit("chooseCategory",i()({},e))},deleteCategory:function(e){var t=this;this.removeCategory(e).then(function(e){t.$emit("showInfo",e),t.getAllCategories()}).catch(function(e){return t.$emit("showInfo",e)})}})},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"px-3 py-3"},[n("v-subheader",{staticClass:"headline pl-0"},[e._v("Рубрики")]),n("v-divider"),n("v-expansion-panel",e._l(e.categories,function(t,o){return n("v-expansion-panel-content",{key:o},[n("div",{attrs:{slot:"header"},slot:"header"},[n("v-layout",{attrs:{"justify-between":"justify-between",row:"row"}},[n("v-subheader",[e._v(e._s(t.title))]),n("v-subheader",[e._v("Підрубрик: "+e._s(t.subcategories.length))])],1)],1),n("v-card",{staticClass:"px-2 py-2"},[t.subcategories.length?n("ul",{staticClass:"ml-3"},e._l(t.subcategories,function(t,o){return n("li",{key:o},[e._v(e._s(t.title))])})):e._e(),n("v-card-actions",[n("v-btn",{attrs:{icon:"icon",color:"teal"},nativeOn:{click:function(n){e.chooseCategory(t)}}},[n("v-icon",[e._v("edit")])],1),n("v-btn",{attrs:{icon:"icon",color:"pink"},nativeOn:{click:function(n){e.deleteCategory(t._id)}}},[n("v-icon",[e._v("delete")])],1)],1)],1)],1)}))],1)},staticRenderFns:[]};var c=n("VU/8")(r,a,!1,function(e){n("OSkE")},null,null);t.default=c.exports}});
//# sourceMappingURL=7.6a4d38f263b6c668e8e6.js.map