(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03d6ca6c"],{1303:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app-bar",{attrs:{color:"#0D0D0D",dark:"",app:""}},[a("v-toolbar-title",[a("router-link",{staticClass:"ml-2",style:{color:"white",textDecoration:"none",fontWeight:"bold",fontSize:"1.5em"},attrs:{to:"/"}},[t._v("Mojuri ")])],1),a("v-spacer"),a("v-btn",{staticClass:"ma-2 grey lighten-1",style:{fontSize:"1.25em",fontWeight:"bold"},attrs:{large:"",to:"/board"}},[t._v(" 게시판 "),a("v-icon",{staticClass:"ml-3",attrs:{large:"",right:""}},[t._v(" mdi-clipboard-edit-outline ")])],1),a("v-btn",{staticClass:"ma-2 grey lighten-1",style:{fontSize:"1.25em",fontWeight:"bold"},attrs:{large:"",to:"/sign-up"}},[t._v(" 회원가입 ")]),a("v-btn",{staticClass:"ma-2 grey lighten-1",style:{fontSize:"1.25em",fontWeight:"bold"},attrs:{large:"",to:"/user-authentication"}},[t._v(" 로그인 ")])],1)},s=[],o={name:"Appbar",data:function(){return{}}},l=o,n=a("2877"),r=a("6544"),c=a.n(r),d=a("40dc"),u=a("8336"),v=a("132d"),m=a("2fa4"),p=a("2a7f"),h=Object(n["a"])(l,i,s,!1,null,null,null);e["a"]=h.exports;c()(h,{VAppBar:d["a"],VBtn:u["a"],VIcon:v["a"],VSpacer:m["a"],VToolbarTitle:p["a"]})},"5d6d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{app:""}},[a("Appbar"),a("v-main",{staticClass:"back"},[a("v-container",{attrs:{fluid:""}},[a("v-row",{staticClass:"mt-9",attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",md:"8"}},[a("BoardCard")],1),a("v-col",{attrs:{cols:"12",md:"8"}},[a("BoardCardList")],1)],1)],1)],1)],1)},s=[],o=a("1303"),l=a("83dc"),n=a("9df5"),r={name:"Board",components:{Appbar:o["a"],BoardCard:l["a"],BoardCardList:n["a"]},data:function(){return{}}},c=r,d=a("2877"),u=a("6544"),v=a.n(u),m=a("7496"),p=a("62ad"),h=a("a523"),f=a("f6c4"),g=a("0fd9"),b=Object(d["a"])(c,i,s,!1,null,"992edeb0",null);e["default"]=b.exports;v()(b,{VApp:m["a"],VCol:p["a"],VContainer:h["a"],VMain:f["a"],VRow:g["a"]})},"7e58":function(t,e,a){},"83dc":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"900px","min-width":"400x",flat:""}},[a("v-container",[a("v-row",{attrs:{justify:"space-between"}},[a("v-col",{staticClass:"mt-6 ml-6 pa-0",attrs:{cols:"auto"}},[a("p",{staticClass:"text-h5 text-left font-weight-black mb-0"},[t._v("게시판")])]),a("v-col",{staticClass:"mt-3 mr-3 pa-0",attrs:{cols:"auto"}},[a("v-btn",{staticClass:"text-h6 font-weight-bold ac",attrs:{text:"",to:"/board-write"}},[t._v(" 글쓰기 ")])],1)],1),a("v-row",[a("v-col",{attrs:{md:"8",cols:"12"}},[a("v-btn-toggle",{attrs:{group:""},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}},t._l(t.btns,(function(e,i){return a("v-btn",{key:i,staticClass:"mx-6",style:{fontSize:"1.25em",fontWeight:"bold"},attrs:{value:e.value,"active-class":"ac"}},[t._v(t._s(e.text))])})),1)],1),a("v-col",{attrs:{md:"4",cols:"12","align-self":"center"}},[a("v-text-field",{staticStyle:{"border-radius":"15px"},attrs:{dense:"",solo:"",height:"44px",label:"제목",flat:"","hide-details":"auto",outlined:""},model:{value:t.magnify,callback:function(e){t.magnify=e},expression:"magnify"}},[a("v-icon",{attrs:{slot:"append",color:"black",large:""},on:{click:t.nothing},slot:"append"},[t._v("mdi-magnify")])],1)],1)],1)],1)],1)},s=[],o={name:"BoardCard",data:function(){return{text:"popularity",magnify:"",btns:[{value:"popularity",text:"인기"},{value:"Latest",text:"최신"},{value:"Recommendation",text:"추천"}]}},methods:{nothing:function(){console.log(this.magnify)}}},l=o,n=(a("c771"),a("2877")),r=a("6544"),c=a.n(r),d=a("8336"),u=a("5530"),v=(a("7e58"),a("604c")),m=v["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return v["a"].options.computed.classes.call(this)}},methods:{genData:v["a"].options.methods.genData}}),p=a("a9ad"),h=a("58df"),f=Object(h["a"])(m,p["a"]).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes:function(){return Object(u["a"])(Object(u["a"])({},m.options.computed.classes.call(this)),{},{"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile},this.themeClasses)}},methods:{genData:function(){var t=this.setTextColor(this.color,Object(u["a"])({},m.options.methods.genData.call(this)));return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),g=a("b0af"),b=a("62ad"),C=a("a523"),_=a("132d"),x=a("0fd9"),w=a("8654"),V=Object(n["a"])(l,i,s,!1,null,"0dd5effc",null);e["a"]=V.exports;c()(V,{VBtn:d["a"],VBtnToggle:f,VCard:g["a"],VCol:b["a"],VContainer:C["a"],VIcon:_["a"],VRow:x["a"],VTextField:w["a"]})},"8ce9":function(t,e,a){},"9df5":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"900px","min-width":"400px",flat:""}},[a("v-list",{staticClass:"pa-0"},[a("v-list-item-group",[t._l(t.articles,(function(e,i){return[a("v-list-item",{key:i,staticClass:"pa-0",attrs:{"two-line":""},on:{click:function(e){return t.viewArticle(i)}}},[a("v-btn",{attrs:{text:"",disabled:""}},[a("v-row",{attrs:{justify:"center",align:"center"}},[a("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[a("v-icon",[t._v("mdi-menu-up")])],1),a("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[a("div",[t._v(t._s(e.likeCount))])])],1)],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.title)+" ")]),a("v-list-item-subtitle",{staticClass:"mt-3"},[t._v(" "+t._s(e.theme)+" | "+t._s(e.writer)+" ")])],1),a("v-list-item-action",{staticClass:"mt-12"},[a("v-list-item-action-text",{staticClass:"mr-3"},[t._v(" "+t._s(e.lastTime)+" 시간 전 ")])],1)],1),a("v-divider",{key:i+" - divider"})]}))],2)],1),a("v-row",{staticClass:"mt-3",attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"3"}}),t.page>1?a("v-col",{attrs:{cols:"auto"}},[a("v-btn",[a("v-icon",[t._v(" mdi-menu-left ")]),t._v(" 이전 ")],1)],1):t._e(),a("v-col",{attrs:{cols:"auto"}},[a("v-btn",{staticClass:"ml-auto"},[t._v("다음 "),a("v-icon",[t._v(" mdi-menu-right ")])],1)],1),a("v-col",{attrs:{cols:"3"}})],1)],1)},s=[],o={props:{login:{type:Boolean,default:!1}},data:function(){return{page:2,articles:[{_id:1,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:2,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:3,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:4,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:5,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:6,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:7,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:8,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:9,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:10,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:11,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"}]}},methods:{viewArticle:function(t){!1===this.login?this.$router.push({path:"/article/".concat(this.articles[t]._id)}):this.$router.push({path:"/article-logined/".concat(this.articles[t]._id)})}}},l=o,n=a("2877"),r=a("6544"),c=a.n(r),d=a("8336"),u=a("b0af"),v=a("62ad"),m=a("ce7e"),p=a("132d"),h=a("8860"),f=a("da13"),g=a("1800"),b=a("5d23"),C=a("1baa"),_=a("0fd9"),x=Object(n["a"])(l,i,s,!1,null,null,null);e["a"]=x.exports;c()(x,{VBtn:d["a"],VCard:u["a"],VCol:v["a"],VDivider:m["a"],VIcon:p["a"],VList:h["a"],VListItem:f["a"],VListItemAction:g["a"],VListItemActionText:b["a"],VListItemContent:b["b"],VListItemGroup:C["a"],VListItemSubtitle:b["c"],VListItemTitle:b["d"],VRow:_["a"]})},c771:function(t,e,a){"use strict";a("c9d5")},c9d5:function(t,e,a){},ce7e:function(t,e,a){"use strict";var i=a("5530"),s=(a("8ce9"),a("7560"));e["a"]=s["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(i["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(i["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})}}]);
//# sourceMappingURL=chunk-03d6ca6c.e1e7c31f.js.map