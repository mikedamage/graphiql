/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Argument from './Argument';
import MarkdownContent from './MarkdownContent';
import TypeLink from './TypeLink';

export default class FieldDoc extends React.Component {
  static propTypes = {
    field: PropTypes.object,
    onClickType: PropTypes.func,
    markdownConfig: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field;
  }

  render() {
    const field = this.props.field;

    let argsDef;
    if (field.args && field.args.length > 0) {
      argsDef = (
        <div className="doc-category">
          <div className="doc-category-title">
            {'arguments'}
          </div>
          {field.args.map(arg =>
            <div key={arg.name} className="doc-category-item">
              <div>
                <Argument arg={arg} onClickType={this.props.onClickType} />
              </div>
              <MarkdownContent
                markdownConfig={this.props.markdownConfig}
                className="doc-value-description"
                markdown={arg.description}
              />
            </div>,
          )}
        </div>
      );
    }

    return (
      <div>
        <MarkdownContent
          markdownConfig={this.props.markdownConfig}
          className="doc-type-description"
          markdown={field.description || 'No Description'}
        />
        {field.deprecationReason &&
          <MarkdownContent
            markdownConfig={this.props.markdownConfig}
            className="doc-deprecation"
            markdown={field.deprecationReason}
          />}
        <div className="doc-category">
          <div className="doc-category-title">
            {'type'}
          </div>
          <TypeLink type={field.type} onClick={this.props.onClickType} />
        </div>
        {argsDef}
      </div>
    );
  }
}
