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
        
        stage('Deploy') {
            when {
                branch 'main'
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                // Deployment steps for main branch only
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Deploying main branch to production..."
                        // Add your actual deployment commands here
                        // sh 'aws s3 sync dist/ s3://your-prod-bucket --delete'
                    }
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

// Helper functions for notifications
def notifyBuildSuccess() {
    if (env.BRANCH_NAME == 'main') {
        emailext body: "Production deployment successful!\n${BUILD_URL}", 
                 subject: "SUCCESS: ${JOB_NAME} - ${BRANCH_NAME} #${BUILD_NUMBER}", 
                 to: 'team@example.com'
        // slackSend color: 'good', message: "SUCCESS: ${JOB_NAME}/${BRANCH_NAME} (#${BUILD_NUMBER})"
    } else {
        emailext body: "Branch ${BRANCH_NAME} built and tested successfully\n${BUILD_URL}", 
                 subject: "PASSED: ${JOB_NAME} - ${BRANCH_NAME} #${BUILD_NUMBER}", 
                 to: 'team@example.com'
        // slackSend color: 'good', message: "PASSED: ${JOB_NAME}/${BRANCH_NAME} (#${BUILD_NUMBER})"
    }
}

def notifyFailedBuild() {
    emailext body: "Build failed for ${BRANCH_NAME}\n${BUILD_URL}", 
             subject: "FAILED: ${JOB_NAME} - ${BRANCH_NAME} #${BUILD_NUMBER}", 
             to: 'team@example.com'
    // slackSend color: 'danger', message: "FAILED: ${JOB_NAME}/${BRANCH_NAME} (#${BUILD_NUMBER})"
}
