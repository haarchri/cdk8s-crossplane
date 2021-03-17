import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';

import { 
  Bucket, 
  BucketSpecForProviderAcl, 
  BucketSpecForProviderAccelerateConfigurationStatus } from './imports/s3.aws.crossplane.io';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Bucket(this, 'bucket', {
      spec: {
        forProvider: {
          acl: BucketSpecForProviderAcl["PRIVATE"],
          locationConstraint: "eu-central-1",
          accelerateConfiguration: {
            status: BucketSpecForProviderAccelerateConfigurationStatus["ENABLED"]
          },
        },
        "providerConfigRef": {
          "name": "example"
        }
      }
    });
  }
}

const app = new App();
new MyChart(app, 'crossplane-cdk8s');
app.synth();
