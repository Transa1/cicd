pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        APP_NAME = 'my-vite-app'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node') {
            steps {
                nvm(nodeVersion: env.NODE_VERSION) {
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    notifyFailedBuild()
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy to Vercel') {
            when {
                branch 'main'
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    echo "Deploying main branch to Vercel..."
                    sh 'npm install -g vercel'
                    
                    // Reemplaza 'tu_token_vercel_aqui' con tu token real
                    def vercelToken = 'y8EJ6IrL5jR14MdfMTXFyRTG'
                    
                    sh """
                        vercel --prod --token ${vercelToken} --confirm
                    """
                    
                    // Get and store deployment URL
                    def deploymentUrl = sh(
                        script: "vercel --prod --token ${vercelToken} --confirm 2>&1 | grep 'Production:' | awk '{print \$3}'",
                        returnStdout: true
                    ).trim()
                    
                    // Make URL available to notifications
                    env.DEPLOYMENT_URL = deploymentUrl
                    echo "Deployed to: ${env.DEPLOYMENT_URL}"
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            notifyBuildSuccess()
        }
        failure {
            notifyFailedBuild()
        }
    }
}

def notifyBuildSuccess() {
    if (env.BRANCH_NAME == 'main') {
        emailext body: """Production deployment successful!
                           Deployment URL: ${env.DEPLOYMENT_URL}
                           Build URL: ${BUILD_URL}""", 
                 subject: "SUCCESS: ${JOB_NAME} - ${BRANCH_NAME} #${BUILD_NUMBER}", 
                 to: 'kevinx.martinez.haro@gmail.com'
        // slackSend color: 'good', 
        //            message: "SUCCESS: ${JOB_NAME}/${BRANCH_NAME} (#${BUILD_NUMBER})\nDeployed to: ${env.DEPLOYMENT_URL}"
    } else {
        emailext body: "Branch ${BRANCH_NAME} built and tested successfully\n${BUILD_URL}", 
                 subject: "PASSED: ${JOB_NAME} - ${BRANCH_NAME} #${BUILD_NUMBER}", 
                 to: 'kevinx.martinez.haro@gmail.com'
        // slackSend color: 'good', message: "PASSED: ${JOB_NAME}/${BRANCH_NAME} (#${BUILD_NUMBER})"
    }
}

def notifyFailedBuild() {
    emailext body: "Build failed for ${BRANCH_NAME}\n${BUILD_URL}", 
             subject: "FAILED: ${JOB_NAME} - ${BRANCH_NAME} #${BUILD_NUMBER}", 
             to: 'kevinx.martinez.haro@gmail.com'
    // slackSend color: 'danger', message: "FAILED: ${JOB_NAME}/${BRANCH_NAME} (#${BUILD_NUMBER})"
}