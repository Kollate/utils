#!/bin/bash

pact-broker create-webhook \
    $JENKINS_HTTPS_URL/job/gateway/job/master/buildWithParameters?PACT_VERIFY=true \
    --request=POST \
    --contract-content-changed \
    --consumer=AuthService \
    --provider=Gateway \
    --user=$JENKINS_USERNAME:$JENKINS_USERTOKEN \
    --broker-base-url=$PACT_BROKER_URL \
    --broker-token=$PACT_BROKER_TOKEN
# declare PROVIDER_JOB_MAP=(\
#   ["GroupService"]="group-service" \
#   ["AuthService"]="auth-service"
# )
# consumer=AuthService
# providers=(GroupService AuthService)

# for provider in ${providers[@]}; do
#   echo $provider
#   echo "${PROVIDER_JOB_MAP[provider]}"x
# done;
# for provider in ${providers[@]}; do
#   pact-broker create-webhook \
#     $JENKINS_HTTPS_URL/job/test/buildWithParameters?PACT_VERIFY=true \
#     --request=POST \
#     --contract-content-changed \
#     --consumer=$consumer \
#     --provider=$provider \
#     --user=$JENKINS_USERNAME:$JENKINS_USERTOKEN \
#     --broker-base-url=$PACT_BROKER_URL \
#     --broker-token=$PACT_BROKER_TOKEN
# done;
