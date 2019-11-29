(this.webpackJsonpcurrency=this.webpackJsonpcurrency||[]).push([[0],{108:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),l=a(18),s=a.n(l),c=(a(53),a(40)),i=a(41),o=a(42),m=a(46),u=a(43),d=a(9),h=a(47),g=(a(54),a(36)),y=a.n(g),E=(a(55),a(44)),D=a.n(E),b=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target;a.setState(Object(c.a)({},t.name,t.value))},a.createChangeTable=function(){if(!0===a.state.isLoaded){var e=[],t=[];return t.push(r.a.createElement("tr",{key:0},r.a.createElement("td",null,a.state.currency),r.a.createElement("td",null,a.state.dataFrom),r.a.createElement("td",null,a.state.dataTo),r.a.createElement("td",null,a.state.courseChanged))),e.push(r.a.createElement("tbody",{key:0},t)),e}},a.createTable=function(){if(!0===a.state.isLoaded){for(var e=a.state.currenciesData,t=[],n=[],l=(new DOMParser).parseFromString(e,"application/xml"),s=l.getElementsByTagName("Amt").length,c=1;c<s;c+=2){var i=c/2;i=Math.floor(i),n.push(r.a.createElement("tr",{key:i},r.a.createElement("td",null,l.getElementsByTagName("Ccy")[c].textContent),r.a.createElement("td",null,l.getElementsByTagName("Dt")[i].textContent),r.a.createElement("td",null,l.getElementsByTagName("Amt")[c].textContent)))}return t.push(r.a.createElement("tbody",{key:0},n)),t}},a.state={currency:"AUD",dataFrom:"",dataTo:"",startDate:new Date,endDate:new Date,bom:!1,isLoaded:!1,currenciesData:[],startValue:"",endValue:"",courseChanged:"",nameError:!1,xmlData:[]},a.startingDateChangeHandler=a.startingDateChangeHandler.bind(Object(d.a)(a)),a.endingDateChangeHandler=a.endingDateChangeHandler.bind(Object(d.a)(a)),a.handleChange=a.handleChange.bind(Object(d.a)(a)),a.currencyCourseChanged=a.currencyCourseChanged.bind(Object(d.a)(a)),a.dataFromXml=a.dataFromXml.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.startingDateChangeHandler(this.state.startDate),this.endingDateChangeHandler(this.state.endDate),this.loadData(),this.dataFromXml()}},{key:"currencyChecker",value:function(){var e=this.state.currency;if(""!==(e=e.toUpperCase()))return["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RUB","SEK","SGD","THB","TRY","USD","ZAR"].includes(e)?(this.setState({nameError:!1,currency:e}),!0):(alert("Wrong input! Use USD as example"),!1);this.setState({nameError:"Please fill currency blank!"})}},{key:"dateFormater",value:function(e){if(null!=e)return e.getMonth()+1<10&&e.getDate()<10?e.getFullYear()+"-0"+(e.getMonth()+1)+"-0"+e.getDate():e.getDate()<10?e.getFullYear()+"-"+(e.getMonth()+1)+"-0"+e.getDate():e.getMonth()+1<10?e.getFullYear()+"-0"+(e.getMonth()+1)+"-"+e.getDate():e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()}},{key:"startingDateChangeHandler",value:function(e){var t=this.dateFormater(e);this.setState({startDate:e,dataFrom:t})}},{key:"endingDateChangeHandler",value:function(e){var t=this.dateFormater(e);this.setState({endDate:e,dataTo:t})}},{key:"currencyCourseChanged",value:function(){var e=(new DOMParser).parseFromString(this.state.currenciesData,"application/xml"),t=e.getElementsByTagName("Amt").length,a=e.getElementsByTagName("Amt")[1].textContent,n=e.getElementsByTagName("Amt")[t-1].textContent-a;n=n.toFixed(5),this.setState({courseChanged:n})}},{key:"loadData",value:function(){var e=this;if(!0!==this.currencyChecker());else{var t=new Request("https://lb.lt/webservices/FxRates/FxRates.asmx/getFxRatesForCurrency?tp=EU&ccy=".concat(this.state.currency,"&dtFrom=").concat(this.state.dataFrom,"&dtTo=").concat(this.state.dataTo)).url;console.log(t),fetch("https://cors-anywhere.herokuapp.com/"+t).then((function(e){return e.text()})).then((function(t){e.setState({isLoaded:!0,currenciesData:t}),e.createTable(),e.currencyCourseChanged(),e.dataFromXml()}),(function(t){e.setState({isLoaded:!0,error:t})}))}}},{key:"onSubmit",value:function(e){e.preventDefault(),this.loadData()}},{key:"dataFromXml",value:function(){if(!0===this.state.isLoaded){for(var e=[],t=(new DOMParser).parseFromString(this.state.currenciesData,"application/xml"),a=t.getElementsByTagName("Amt").length,n=1;n<a;n+=2){var r=n/2;r=Math.floor(r),console.log(r),e.push({Valiuta:t.getElementsByTagName("Ccy")[n].textContent,Data:t.getElementsByTagName("Dt")[r].textContent,Santykis:t.getElementsByTagName("Amt")[n].textContent})}this.setState({xmlData:e})}}},{key:"render",value:function(){return r.a.createElement("div",{className:"App-body"},r.a.createElement("div",{className:"center"},r.a.createElement("div",{className:"currency-form"},r.a.createElement("form",{className:"",onSubmit:this.onSubmit.bind(this)},r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",name:"currency",value:this.state.currency,onChange:this.handleChange,placeholder:"Valiutos pavadinimo santraupa"}),r.a.createElement("span",{className:"help-is-danger"},this.state.nameError)),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",null,"DATA NUO:"),r.a.createElement(y.a,{dateFormat:"yyyy-MM-dd",selected:this.state.startDate,onChange:this.startingDateChangeHandler})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",null,"DATA IKI:"),r.a.createElement(y.a,{dateFormat:"yyyy-MM-dd",selected:this.state.endDate,onChange:this.endingDateChangeHandler})),r.a.createElement("div",{className:"get-currency-data-buttons"},r.a.createElement("button",{className:"blue btn",type:"submit",name:"action"},r.a.createElement("i",{className:"material-icons right"},"arrow_forward"),"Gauti duomenis"))),r.a.createElement("div",{className:"get-currency-data-buttons"},r.a.createElement(D.a,{bom:this.state.bom,datas:this.state.xmlData,filename:"currency.csv"},r.a.createElement("button",{onClick:this.dataFromXml,type:"submit",className:"green btn-small"},r.a.createElement("i",{className:"material-icons right"},"file_download"),"Atsisi\u0173sti .CSV formatu"))))),r.a.createElement("div",{className:""},r.a.createElement("table",{className:"currency-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Valiutos kodas"),r.a.createElement("th",null,"Periodo prad\u017eia"),r.a.createElement("th",null,"Periodo pabaiga"),r.a.createElement("th",null,"Pokytis"))),this.createChangeTable()),r.a.createElement("table",{className:"currency-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Valiutos kodas"),r.a.createElement("th",null,"Data"),r.a.createElement("th",null,"Santykis"))),this.createTable())))}}]),t}(n.Component);s.a.render(r.a.createElement(b,null),document.getElementById("root"))},48:function(e,t,a){e.exports=a(108)},53:function(e,t,a){},54:function(e,t,a){}},[[48,1,2]]]);
//# sourceMappingURL=main.c71f3cd4.chunk.js.map