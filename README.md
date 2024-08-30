**check package.json for dev dependencies**
<!-- 

<!-- 1  -->
<!-- to start the project  -->
git init  
git remote add origin https://github.com/2105007NN/hackCSB-project.git  
git fetch origin  
git checkout -b main origin/main  
git pull origin main  

<!-- 2  -->
<!-- step :1 : to pull in new updates  -->
git add .
git commit -m "before merge commit"
<!-- step:2 :fetch from the current repository-->
git fetch
git pull  origin main
git merge --no-ff
<!-- step: 4:In this step u merge the files manually just tick the side u want to keep-->
<!-- step: 5:Now u are ready to commit-->
git add .
git commit -m "merge resolved" 
git push origin main -->


clone the repository
in the terminal, go into frontend folder (cd frontend)
in another terminal, go into backend folder (cd backend)
in backend terminal run the command "npm run dev"
also in the frontend terminal run "npm run dev"
use the link shown in the frontend terminal to run the application
