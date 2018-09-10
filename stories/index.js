import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import localePtBr from '../src/locales/pt-BR';

const Content = ({ children, style }) => (
  <div
    style={Object.assign(
      {},
      { display: 'flex', flex: 1, justifyContent: 'center' },
      style
    )}
  >
    {children}
  </div>
);

storiesOf('Examples', module)
  .add('Basic', () => (
    <Content>
      <SemanticDatepicker onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with firstDayOfWeek', () => (
    <Content>
      <SemanticDatepicker firstDayOfWeek={3} onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with outside days', () => (
    <Content>
      <SemanticDatepicker showOutsideDays onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with format prop', () => (
    <Content>
      <SemanticDatepicker format="DD/MM/YYYY" onDateChange={console.log} />
    </Content>
  ))
  .add('Range', () => (
    <Content>
      <SemanticDatepicker type="range" onDateChange={console.log} />
    </Content>
  ))
  .add('Range with right pointing', () => (
    <Content>
      <SemanticDatepicker
        type="range"
        pointing="right"
        onDateChange={console.log}
      />
    </Content>
  ))
  .add('Range with firstDayOfWeek', () => (
    <Content>
      <SemanticDatepicker
        type="range"
        firstDayOfWeek={6}
        onDateChange={console.log}
      />
    </Content>
  ))
  .add('Range with outside days', () => (
    <Content>
      <SemanticDatepicker
        type="range"
        showOutsideDays
        onDateChange={console.log}
      />
    </Content>
  ))
  .add('Range with format prop', () => (
    <Content>
      <SemanticDatepicker
        type="range"
        format="DD/MM/YYYY"
        onDateChange={console.log}
      />
    </Content>
  ))
  .add('Basic with brazilian portuguese locale', () => (
    <Content>
      <SemanticDatepicker
        onDateChange={console.log}
        format="DD/MM/YYYY"
        locale={localePtBr}
      />
    </Content>
  ))
  .add('Basic as form component', () => (
    <Content>
      <Form>
        <Form.Group width="equals">
          <SemanticDatepicker
            label="Birth date"
            id="birthDate"
            onDateChange={console.log}
            required
          />
          <SemanticDatepicker
            label="Start date"
            id="startDate"
            onDateChange={console.log}
          />
        </Form.Group>
      </Form>
    </Content>
  ))
  .add('Basic with left pointing', () => (
    <Content>
      <SemanticDatepicker pointing="left" onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with right pointing', () => (
    <Content>
      <SemanticDatepicker pointing="right" onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with top pointing', () => (
    <Content
      style={{
        alignItems: 'flex-end',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}
    >
      <SemanticDatepicker pointing="top" onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with top left pointing', () => (
    <Content
      style={{
        alignItems: 'flex-end',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}
    >
      <SemanticDatepicker pointing="top left" onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with top right pointing', () => (
    <Content
      style={{
        alignItems: 'flex-end',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}
    >
      <SemanticDatepicker pointing="top right" onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with bottom pointing', () => (
    <Content>
      <SemanticDatepicker pointing="bottom" onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with bottom left pointing', () => (
    <Content>
      <SemanticDatepicker pointing="bottom left" onDateChange={console.log} />
    </Content>
  ))
  .add('Basic with bottom right pointing', () => (
    <Content>
      <SemanticDatepicker pointing="bottom right" onDateChange={console.log} />
    </Content>
  ));
