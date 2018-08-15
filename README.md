## [Ask Jeeves](https://en.wikipedia.org/wiki/Jeeves): Backend integration of mobile applications using AWS AppSync

| Step | Description   |
| -----|---------------|
| 1.   | [Generate Cloud9 SSH Key](#cloud9-ssh-key) |
| 2.   | [Setup EC2, Cloud9, Elasticsearch, ...](#run-cfn) |
| 3.   | [Install Expo mobile client](#install-expo)
| 4.   | [QR Code friendly Cloud9 theme](#customize-cloud9)|
| 5.   | [Mobile application and Cognito authentication](#clone-mobile-code)
| 6.   | [AppSync Schema ]|
| 7.   | [Integration and testing ]|

<a name="cloud9-ssh-key"></a>
##  I. Generate Cloud9 SSH Key

1.	Login to AWS console and make sure to select Singapore (`ap-southeast-1`) region. You need to be in **Singapore** region for this lab. 
2.	Go to EC2 page and create a new key pair if not already exists and download the key to your machine.
3.	Open AWS Cloud9 services page.
4. Click on **Create Environment**.
  <img src="images/aws-cloud9-create.png" width="33%" />

5. Give any appropriate name and description to your environment. Click on **Next**.
6. In the next page, select the option **Connect and run in remote server (SSH)**. Scroll down and expand View Public SSH key. Click **Copy key to clip board**. Once you have copied the key, please leave this screen intact. We will come back once the EC2 creation completed. 
<img src="images/aws-cloud9-remote-server.png" width="33%" />

<a name="run-cfn"></a>
##  II. Development Stack creation
1. Open a new browser tab and instantiate this CloudFormation template: 
<a href="https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/new?templateURL=https://s3-ap-southeast-1.amazonaws.com/techsummit2018appsync/prereqscfn.json" target="_blank">
  <img src="images/aws-cloudformation-button.png" width="150" />
</a>


2. Click on **Next**. 
<img src="images/aws-cloudformation-scr1.png" width="33%" />

3. Please provide below inputs
	* Stack Name :  cloud9env (any name as you prefer)
	* Cloud9Key : Paste the key you have copied in the step 6, previously.
	* InstanceType : You can leave the default (c4.xlarge)
	* KeyName : Please select the existing key in this region(Singapore). If not, please create one 
	* SSHLocation : We can leave as the default value.
	<img src="images/aws-cloudformation-scr2.png" width="33%" />
    <br/>
    Click on **Next**.
4. Leave the defaults as-is on this screen, click **Next**.
5. In Next screen, Select the checkbox for `I acknowledge that cloudformation might create IAM resouces` in the bottom and Click **Create**.
6. Once the stack creation completes, Go to Outputs and copy the IP address as below
    <img src="images/aws-cloudformation-scr3.png" width="33%" />
7. Go to the cloud9 screen/tab when we left in the step 6 and fill the below details and then click next step.
    * User : ec2-user
    * Host : Paste the IP address copied from the cloudformation stack
    * Port : 22
    * Advanced settings. Environment path – give any pathname (without spaces)
    <img src="images/aws-cloud9-ec2-connect.png" width="33%" />

8. Click **Create environment** and wait for it to complete.<br/>
    <img src="images/aws-cloud9-ec2-connect2.png" width="33%" />
     
9. In the below screen, uncheck the “c9.ide.lambda.docker”. Click **Next**.<br/>
    <img src="images/aws-cloud9-env-ready1.png" width="33%" />
    
10. In the next screen, click cancel the installation and click Finish. We do not need lambda related stuffs for now<br/>
    <img src="images/aws-cloud9-env-ready2.png" width="33%" />
11. Click **Finish** in the below screen<br/>
	<img src="images/aws-cloud9-env-ready3.png" width="33%" />
12. Your cloud9 environment is ready<br/>
    <img src="images/aws-cloud9-env-ready4.png" width="33%" />

<a name="install-expo"></a>
## III. Install Expo mobile client

To participate with your mobile you need to have the Expo Client installed (Android or iOS).<br/>
* **ANDROID CLIENT:**<br/>
    https://play.google.com/store/apps/details?id=host.exp.exponent <br/>
* **IOS CLIENT:**<br/>
    https://itunes.com/apps/exponent <br/>


<a name="customize-cloud9"></a>
## IV. QR Code friendly Cloud9 theme

1. Go to the newly cloud9 environment and click the settings, select THEMES(top right corner near cloud9 symbol). Select one of the Classic theme and night based color ( this is needed for the QR code to be visible for the expo client).<br/>
<img src="images/aws-cloud9-theme1.png" width="33%" />
2. Once the theme got changed, open terminal window. The current working directory will be whatever the environment name you have given during the cloud9 create environment steps.<br/>
3. Open a shell/terminal and run command `create-react-native-app Test`.<br/>
<img src="images/aws-cloud9-theme2.png" width="33%" />
<img src="images/aws-cloud9-theme3.png" width="33%" />
4. Once the creation is success, you will see the final confirmation as below. Also, in your cloud9 IDE, you will see the project folder “Test”.<br/>
<img src="images/aws-cloud9-theme4.png" width="33%" />
5. `cd Test; npm start`<br/>
<img src="images/aws-cloud9-react-app1.png" width="33%" />
<img src="images/aws-cloud9-react-app2.png" width="33%" />
6. Now, from your mobile, open the expo app.<br/>
7. Scan the QR code on the expo app and you will see the application loading in your mobile.<br/>
8. You can edit the file `App.js` and once saved, you will see the application in your mobile auto load the changes.<br/>
<img src="images/aws-cloud9-react-app3.png" width="33%" />

<a name="clone-mobile-code"></a>
## V. Mobile application and Cognito Authentication.

1. `git clone https://github.com/arunmbalaji/ask-jeeves.git`
2. cd to the project directory "ask-jeeves".
3. Firstly Install Node.js (download from https://nodejs.org/en/). This will give us npm.
4. We can then install some dependencies:
>npm install -g react-native-cli

Yarn is also widely used instead of npm - many online demos use it so it's not bad idea to install, but npm will work fine as well.

>npm install -g yarn

>npm install -g awsmobile-cli

5. Set up an IAM user.  YouTube - Configuring the AWSMobile CLI
https://www.youtube.com/watch?v=MpugaNKtw3k

6. Now configure awsmobile to use our IAM role:

>awsmobile configure

Enter Access Key, Secret Access Key and region (ap-southeast-1)

>awsmobile init

Default answers should be fine:

>Please tell us about your project:
>* Where is your project's source directory:  /
>* Where is your project's distribution directory that stores build artifacts:  /
>* What is your project's build command:  npm.cmd run-script build
>* What is your project's start command for local test run:  npm.cmd run-script start
>* What awsmobile project name would you like to use:  ask-jeeves-2018-08-12-12-11-54

>Successfully created AWS Mobile Hub project: workshop-2018-08-12-12-11-54
>This installed a bunch of dependencies for us:
>info Direct dependencies[...]


There will be a lot of additional info and then at the end you should see something like:
```
Success! your project is now initialized with awsmobilejs
 
   awsmobilejs\.awsmobile
     is the workspace of awsmobile-cli, please do not modify its contents
 
   awsmobilejs\#current-backend-info
      contains information of the backend awsmobile project from the last
      synchronization with the cloud

   awsmobilejs\backend
     is where you develop the codebase of the backend awsmobile project

   awsmobile console
     opens the web console of the backend awsmobile project

   awsmobile run
     pushes the latest development of the backend awsmobile project to the cloud,
     and runs the frontend application locally

   awsmobile publish
     pushes the latest development of the backend awsmobile project to the cloud,
     and publishes the frontend application to aws S3 for hosting

Happy coding with awsmobile!
```

This will have created some backend resources including some S3 buckets.  You should now see your project in the AWS Mobile Hub console.



## VI. Verifying your Elasticsearch cluster installation

1.	Open the cloud9 terminal
2.	Issue the below command `curl -XGET <your es domain name – copy from cloudformation output>/amazonec2_new/_count`
<img src="images/aws-cloud9-es1.png" />
<img src="images/aws-cloud9-es2.png" />