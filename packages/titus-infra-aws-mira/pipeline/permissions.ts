import * as fs from 'fs'
import * as path from 'path'
import {DeploymentPermissions, MiraApp, MiraConfig} from 'mira'
import {CfnOutput, Construct} from '@aws-cdk/core'
import {PolicyStatement} from '@aws-cdk/aws-iam'
import Handlebars from 'handlebars'
import {isArray} from "aws-cdk/lib/util";

export default class CustomPermissions extends DeploymentPermissions {
  constructor(parent: Construct, props?: any) {
    super(parent, props)
    const account = MiraConfig.getEnvironment()
    const baseProject = MiraApp.getBaseStackName()

    const policyString = fs.readFileSync(path.resolve(__dirname, 'policy.json'), 'utf-8')

    const template = Handlebars.compile(policyString);
    const data = {
      "region": account.env.region,
      "account-id": account.env.account,
      "stack-name": baseProject,
      "stack-name-lower-case": baseProject.toLowerCase()
    };
    const result = JSON.parse(template(data));
    fs.writeFileSync(path.resolve(__dirname, 'policy-with-replaced-values.json'), JSON.stringify(result, null, 2))

    result.Statement.forEach((statement: any) => {
      this.role.addToPolicy(new PolicyStatement(
        {
          actions: statement.Action,
          resources: isArray(statement.Resource) ? statement.Resource : [statement.Resource],
          conditions: statement.Condition
        },
      ))
    })

    new CfnOutput((this as unknown) as Construct, 'DeployRoleArn', {
      value: this.role.roleArn
    })
  }
}
