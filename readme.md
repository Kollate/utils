### To trigger remote build of a pipeline with trigger parameters:

1. Define parameters in the pipeline project:

```groovy
pipeline {
  agent any
  parameters {
      string(name: 'TRIGGER_PARAM', defaultValue: '', description: 'trigger param description')
  }
}
```

2. create token from here: http://myjenkins:8080/user/surajkeshri/configure

```
http://[USERNAME]:[TOKEN]@myjenkins:8080/job/[pipeline-project-name]/job/[branch]/buildWithParameters?TRIGGER_PARAM=yo
```

### To trigger remote build of a pipeline without params:

1. Step 1 without paramters
2. Same as step 2
3. Trigger:

```
http://[USERNAME]:[TOKEN]@myjenkins:8080/job/[pipeline-project-name]/job/[branch]/build
```

pact-broker create-webhook http://myjenkins:8080/job/auth-service/job/master/buildWithParameters?PACT_VERIFY=true --request=POST --broker-base-url=\${BROKER_BASE_URL}

pact-broker create-webhook \
http://myjenkins:8080/job/test/buildWithParameters?PACT_VERIFY=true \
--request=POST --contract-content-changed \
--provider=AuthService --user=surajkeshri:password \
--broker-base-url=$PACT_BROKER_URL --broker-token=$PACT_BROKER_TOKEN
