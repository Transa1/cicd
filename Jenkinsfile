pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token')  // ID de la credencial en Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // Jenkins ya sabe la rama actual
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test'){
            steps{
                sh 'npm test'
            }
        }

        stage('Conditional Deploy') {
            steps {
                script {
                    def branch = env.GIT_BRANCH ?: sh(
                        script: "git rev-parse --abbrev-ref HEAD",
                        returnStdout: true
                    ).trim()

                    echo "Current branch: ${branch}"

                    if (branch == 'main' || branch == 'origin/main') {
                        echo "Deploying to Vercel..."

                        def output = sh(
                            script: 'npx vercel --prod --token=$VERCEL_TOKEN --yes --name=my-vite-app',
                            returnStdout: true
                        ).trim()

                        def deploymentUrl = output.split('\n').find { it.contains("https") }
                        echo "Deployment URL: ${deploymentUrl}"
                    } else {
                        echo "No deploy. Just built branch '${branch}'"
                    }
                }
            }
        }
    }
}
