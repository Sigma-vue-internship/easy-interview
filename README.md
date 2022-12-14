#Docs

https://github.com/Sigma-vue-internship/easy-interview/wiki

# Project requirements

## General description:
The main idea of platform to help developers make interview proccess easy. 
Platform should consist of this features:
* Login page, UI can provide Auth0
* Dashboard with quick widgets
* Add/Edit/Delete questions with answers by category (OOP, Algorithms, HTML/CSS, JavaScript, and so on)
* View list of questions with filters by category
* Add/Edit/View candidate, with interview results (if exist)
* View list candidates, search, sort, filtering
* **Main feature** - Quiz wizard with questions/answers list (Must to have progress bar, count of correct/incorrect answers, reference to candidate, results saving).
* Quiz result after interview by each candidates and list of correct/incorrect answers for rating and evaluation
* Add/Edit candidate reviews
 

## Main stack:
* Client on Vue3
* Pinia for state management
* Vue Router
* UI/UX based on [BootstrapVue](https://bootstrap-vue.org/) / [Ant Desing](https://github.com/vueComponent/ant-design-vue/) / [Prime Vue](https://www.primefaces.org/primevue/setup) / [vuestic](https://Vuestic.dev/)
* Secure access based on [Auth0](https://auth0.com[/) or similar
* Backend [Mockapi](http://mockapi.io)
* Unit Tests on Vitest
* Deploy on [heroku](https://dashboard.heroku.com/)

## Technical requirements:
* Mobile first
* Light weight
* Unit Tests coverage more than 60%
* Quality Gates in CI/CD with GitHub
* Automatic deploy process
* Duplication in code less than 5%
* Fast speed loading (more than 80% by [pagespeed](https://pagespeed.web.dev/))

## Nice to have:
* If we will have free time you can add here all what you want.
