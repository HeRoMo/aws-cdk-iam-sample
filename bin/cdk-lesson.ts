#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkLessonStack } from '../lib/cdk-lesson-stack';

const app = new cdk.App();
new CdkLessonStack(app, 'CdkLessonStack');
