(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d75659a2"],{"0f38":function(t,e,a){},"1c39":function(t,e,a){"use strict";a("0f38")},"25cf":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto",attrs:{height:"400",width:"70%",flat:""}},[a("v-card-title",{staticClass:"text-h5 title",staticStyle:{"font-weight":"900","font-size":"25px !important"}},[t._v(" "+t._s(t.$store.state.auth.userId)+" ")]),a("v-card-text",[a("v-container",[a("v-list",{staticClass:"py-0"},[t._l(t.mypagebuttons,(function(e,i){return[a("v-list-item",{key:i,attrs:{link:"",to:e.to}},[a("v-list-item-title",{staticClass:"text-md-center"},[t._v(t._s(e.content)+" ")])],1),i<t.mypagebuttons.length-1?a("v-divider",{key:i+" - divider"}):t._e()]}))],2)],1)],1)],1)},s=[],o={name:"BoardBox",data:function(){return{mypagebuttons:[{content:"내가 쓴 글",to:"/my-board"},{content:"북마크",to:"/bookmark"}]}}},n=o,l=(a("1c39"),a("2877")),r=a("6544"),c=a.n(r),d=a("b0af"),u=a("99d9"),m=a("a523"),v=a("ce7e"),p=a("8860"),f=a("da13"),h=a("5d23"),g=Object(l["a"])(n,i,s,!1,null,"364fe733",null);e["a"]=g.exports;c()(g,{VCard:d["a"],VCardText:u["b"],VCardTitle:u["c"],VContainer:m["a"],VDivider:v["a"],VList:p["a"],VListItem:f["a"],VListItemTitle:h["d"]})},"7e58":function(t,e,a){},"83dc":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"900px","min-width":"400x",flat:""}},[a("v-container",[a("v-row",{attrs:{justify:"space-between"}},[a("v-col",{staticClass:"mt-6 ml-6 pa-0",attrs:{cols:"auto"}},[a("p",{staticClass:"text-h5 text-left font-weight-black mb-0"},[t._v("게시판")])]),a("v-col",{staticClass:"mt-3 mr-3 pa-0",attrs:{cols:"auto"}},[a("v-btn",{staticClass:"text-h6 font-weight-bold ac",attrs:{text:"",to:"/board-write"}},[t._v(" 글쓰기 ")])],1)],1),a("v-row",[a("v-col",{attrs:{md:"8",cols:"12"}},[a("v-btn-toggle",{attrs:{group:""},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}},t._l(t.btns,(function(e,i){return a("v-btn",{key:i,staticClass:"mx-6",style:{fontSize:"1.25em",fontWeight:"bold"},attrs:{value:e.value,"active-class":"ac"}},[t._v(t._s(e.text))])})),1)],1),a("v-col",{attrs:{md:"4",cols:"12","align-self":"center"}},[a("v-text-field",{staticStyle:{"border-radius":"15px"},attrs:{dense:"",solo:"",height:"44px",label:"제목",flat:"","hide-details":"auto",outlined:""},model:{value:t.magnify,callback:function(e){t.magnify=e},expression:"magnify"}},[a("v-icon",{attrs:{slot:"append",color:"black",large:""},on:{click:t.nothing},slot:"append"},[t._v("mdi-magnify")])],1)],1)],1)],1)],1)},s=[],o={name:"BoardCard",data:function(){return{text:"popularity",magnify:"",btns:[{value:"popularity",text:"인기"},{value:"Latest",text:"최신"},{value:"Recommendation",text:"추천"}]}},methods:{nothing:function(){console.log(this.magnify)}}},n=o,l=(a("c771"),a("2877")),r=a("6544"),c=a.n(r),d=a("8336"),u=a("5530"),m=(a("7e58"),a("604c")),v=m["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return m["a"].options.computed.classes.call(this)}},methods:{genData:m["a"].options.methods.genData}}),p=a("a9ad"),f=a("58df"),h=Object(f["a"])(v,p["a"]).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes:function(){return Object(u["a"])(Object(u["a"])({},v.options.computed.classes.call(this)),{},{"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile},this.themeClasses)}},methods:{genData:function(){var t=this.setTextColor(this.color,Object(u["a"])({},v.options.methods.genData.call(this)));return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),g=a("b0af"),b=a("62ad"),C=a("a523"),_=a("132d"),x=a("0fd9"),w=a("8654"),k=Object(l["a"])(n,i,s,!1,null,"0dd5effc",null);e["a"]=k.exports;c()(k,{VBtn:d["a"],VBtnToggle:h,VCard:g["a"],VCol:b["a"],VContainer:C["a"],VIcon:_["a"],VRow:x["a"],VTextField:w["a"]})},"8a37":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{app:""}},[a("AppbarLogined"),a("v-main",{staticClass:"back"},[a("v-container",{attrs:{fluid:""}},[a("v-row",{staticClass:"mt-8",attrs:{"fill-height":"","align-content":"space-around",justify:"center"}},[t.$vuetify.breakpoint.xl||t.$vuetify.breakpoint.lg||t.$vuetify.breakpoint.md?a("v-col",{staticClass:"py-0",attrs:{md:"3"}},[a("BoardBox",{style:{top:"88px",position:"sticky"}})],1):t._e(),a("v-col",{staticClass:"mr-16 pt-0",attrs:{md:"8"}},[a("BoardCard",{staticClass:"mb-6"}),a("BoardCardList",{attrs:{login:!0}})],1)],1)],1)],1)],1)},s=[],o=a("8eb1"),n=a("83dc"),l=a("9df5"),r=a("25cf"),c={name:"BoardLogined",components:{AppbarLogined:o["a"],BoardCard:n["a"],BoardCardList:l["a"],BoardBox:r["a"]}},d=c,u=a("2877"),m=a("6544"),v=a.n(m),p=a("7496"),f=a("62ad"),h=a("a523"),g=a("f6c4"),b=a("0fd9"),C=Object(u["a"])(d,i,s,!1,null,null,null);e["default"]=C.exports;v()(C,{VApp:p["a"],VCol:f["a"],VContainer:h["a"],VMain:g["a"],VRow:b["a"]})},"9df5":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"900px","min-width":"400px",flat:""}},[a("v-list",{staticClass:"pa-0"},[a("v-list-item-group",[t._l(t.articles,(function(e,i){return[a("v-list-item",{key:i,staticClass:"pa-0",attrs:{"two-line":""},on:{click:function(e){return t.viewArticle(i)}}},[a("v-btn",{attrs:{text:"",disabled:""}},[a("v-row",{attrs:{justify:"center",align:"center"}},[a("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[a("v-icon",[t._v("mdi-menu-up")])],1),a("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[a("div",[t._v(t._s(e.likeCount))])])],1)],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.title)+" ")]),a("v-list-item-subtitle",{staticClass:"mt-3"},[t._v(" "+t._s(e.theme)+" | "+t._s(e.writer)+" ")])],1),a("v-list-item-action",{staticClass:"mt-12"},[a("v-list-item-action-text",{staticClass:"mr-3"},[t._v(" "+t._s(e.lastTime)+" 시간 전 ")])],1)],1),a("v-divider",{key:i+" - divider"})]}))],2)],1),a("v-row",{staticClass:"mt-3",attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"3"}}),t.page>1?a("v-col",{attrs:{cols:"auto"}},[a("v-btn",[a("v-icon",[t._v(" mdi-menu-left ")]),t._v(" 이전 ")],1)],1):t._e(),a("v-col",{attrs:{cols:"auto"}},[a("v-btn",{staticClass:"ml-auto"},[t._v("다음 "),a("v-icon",[t._v(" mdi-menu-right ")])],1)],1),a("v-col",{attrs:{cols:"3"}})],1)],1)},s=[],o={props:{login:{type:Boolean,default:!1}},data:function(){return{page:2,articles:[{_id:1,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:2,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:3,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:4,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:5,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:6,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:7,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:8,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:9,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:10,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"},{_id:11,title:"아무제목",writer:"아무개",likeCount:8,lastTime:10,theme:"자유"}]}},methods:{viewArticle:function(t){!1===this.login?this.$router.push({path:"/article/".concat(this.articles[t]._id)}):this.$router.push({path:"/article-logined/".concat(this.articles[t]._id)})}}},n=o,l=a("2877"),r=a("6544"),c=a.n(r),d=a("8336"),u=a("b0af"),m=a("62ad"),v=a("ce7e"),p=a("132d"),f=a("8860"),h=a("da13"),g=a("1800"),b=a("5d23"),C=a("1baa"),_=a("0fd9"),x=Object(l["a"])(n,i,s,!1,null,null,null);e["a"]=x.exports;c()(x,{VBtn:d["a"],VCard:u["a"],VCol:m["a"],VDivider:v["a"],VIcon:p["a"],VList:f["a"],VListItem:h["a"],VListItemAction:g["a"],VListItemActionText:b["a"],VListItemContent:b["b"],VListItemGroup:C["a"],VListItemSubtitle:b["c"],VListItemTitle:b["d"],VRow:_["a"]})},c771:function(t,e,a){"use strict";a("c9d5")},c9d5:function(t,e,a){}}]);
//# sourceMappingURL=chunk-d75659a2.928073ae.js.map