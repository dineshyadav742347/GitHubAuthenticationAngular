node {
  stage: 'Environment Variables'
  sh "env"

  stage 'Checkout Repository'
  git url: 'https://github.com/dineshyadav742347/GitHubAuthenticationAngular.git', branch: "master"

  stage 'Installing Dependencies'
  	sh "cd server"
    sh "npm install"
    sh 'echo pwd'
}