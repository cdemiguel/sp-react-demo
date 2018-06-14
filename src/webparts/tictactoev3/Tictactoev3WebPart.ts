import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'Tictactoev3WebPartStrings';
import Tictactoev3 from './components/Tictactoev3';
import { ITictactoev3Props } from './components/ITictactoev3Props';

export interface ITictactoev3WebPartProps {
  description: string;
}

export default class Tictactoev3WebPart extends BaseClientSideWebPart<ITictactoev3WebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITictactoev3Props > = React.createElement(
      Tictactoev3,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
