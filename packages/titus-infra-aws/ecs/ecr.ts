import {join as pathJoin} from 'path'
import {Construct, RemovalPolicy} from '@aws-cdk/core';
import {Repository} from '@aws-cdk/aws-ecr'
import {DockerImageAsset} from '@aws-cdk/aws-ecr-assets';
import {MiraStack} from "mira";

export default class ContainerRepository extends Construct {
  public repository: Repository
  // public readonly imageAsset: DockerImageAsset

  constructor(scope: MiraStack, id: string) {
    super(scope, id)
    this.repository = new Repository(scope, `${id}Repository`, {
      repositoryName: 'titus/titus-backend',
      removalPolicy: RemovalPolicy.DESTROY,
    })

    // this.imageAsset = new DockerImageAsset(this, 'TitusBackendBuildImage', {
    //   directory: pathJoin(__dirname, '..', '..', 'titus-backend'),
    //   repositoryName: 'titus/titus-backend'
    // })
  }
}
