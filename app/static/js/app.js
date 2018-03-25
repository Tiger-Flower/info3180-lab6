/* Add your Application JavaScript */
// import fetch from 'isomorphic-fetch'

Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg fixed-top">
              <a class="navbar-brand" href="/">News App</a>
              
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link> 
                  </li>
                  <li class="nav-item">
                    <router-link to="/news" class="nav-link">News</router-link> 
                  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {}
});

const NewsList = Vue.component('news-list', {
  template: `
 <div>
      <h4>News</h4>
      <div class="form-inline d-flex justify-content-center">     
    	<div class="form-group mx-sm-3 mb-2">         
    		<label class="sr-only" for="search">Search</label>         
    		<input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />         
    		<button class="btn  bg btn-primary mb-2" @click="searchNews">Search</button> 
    	</div> 
      </div> 
        <div class="news d-flex flex-wrap">     
    	  <div v-for="article in articles" class="card d-flex flex-sm-wrap news-item m-3 p-2">
            <h2 class="card-title">{{article.title}}</h2>
            <div class="card-body">  
            <img class="card-img" alt="Card image cap" v-bind:src="article.urlToImage">
                <p class="card-text">{{article.description}}</p>
     
         </div>
       </div>
    </div>
</div>
  
  `,
     methods:{
         searchNews: function() { 
          let self = this; 
          fetch('https://newsapi.org/v2/everything?q='+ self.searchTerm +'&language=en&apiKey=<api-key>')
          .then(function(response){ return response.json();}).then(function(data){console.log(data);self.articles = data.articles; });}},   

    data:function(){ return{articles:[],searchTerm: ''  }},
    created: function(){
          let self = this; 
          fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=<api-key>')
          .then(function(response){ return response.json();}).then(function(data){console.log(data);self.articles = data.articles; });}
    
});


const Home = Vue.component('home',{
   template:`
   <div class="home text-center">         
	<img src="/static/images/logo.png" alt="VueJS Logo">        
           <h1>{{ home }}</h1>       
   </div>  
   `,
   data:function(){return {home:'Hello World! Welcome to VueJS'}} 
    
    
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.
                <a href="https://newsapi.org/docs/get-started">Powered by News API.</a></p>
                
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
})




const router = new VueRouter({   
mode: 'history',   
routes: [       
	{ path: '/', component: Home },       
	{ path: '/news', component: NewsList }   
] }); 

let app = new Vue({
    el: '#app',
    router
});

