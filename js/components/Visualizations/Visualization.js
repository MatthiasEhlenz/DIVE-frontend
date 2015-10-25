import React, { Component, PropTypes } from 'react';

import styles from './Visualizations.sass';

import TreeMap from './Charts/TreeMap';
import PieChart from './Charts/PieChart';
import ColumnChart from './Charts/ColumnChart';
import StackedColumnChart from './Charts/StackedColumnChart';
import ScatterChart from './Charts/ScatterChart';

export default class Visualization extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { onClick, spec } = this.props;

    if (onClick) {
      onClick(spec.id);
    }
  }

  render() {
    const MAX_ELEMENTS = 2000;
    const { data, spec, containerClassName, showHeader, headerClassName, visualizationClassName, overflowTextClassName, isMinimalView, visualizationTypes } = this.props;

    var options = {
      backgroundColor: 'transparent',
      headerColor: 'white',
      headerHeight: 0
    };

    if (isMinimalView) {
      options = {
        ...options,
        axisTitlesPosition: 'none',
        chartArea: {
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        },
        enableInteractivity: false,
        fontSize: 0,
        hAxis: {
          textPosition: 'none'
        },
        height: 140,
        highlightOnMouseOver: false,
        hintOpacity: 0,
        legend: {
          position: 'none'
        },
        showTooltips: false,
        textStyle: {
          color: 'transparent',
          fontSize: 0
        },
        tooltip: {
          trigger: 'none'
        },
        vAxis: {
          textPosition: 'none',
          baselineColor: 'transparent',
          gridlines: {
            count: 0
          }
        }
      };
    } else {
      options = {
        ...options,
        height: 400
      }
    }

    const validVisualizationTypes = spec.vizTypes.filter((vizType) => visualizationTypes.length == 0 || visualizationTypes.indexOf(vizType) >= 0);

    return (
      <div className={ styles[containerClassName] } onClick={ this.handleClick }>
        { showHeader && spec.meta &&
          <div className={ styles[headerClassName] }>
            { spec.meta.construction.map((construct, i) =>
              <span key={ `construct-${ construct.type }-${ i }` } className={ `${styles.headerFragment} ${styles[construct.type]}` }>{ construct.string } </span>
            )}
          </div>
        }
        { (!isMinimalView || (data.length < MAX_ELEMENTS)) &&
          <div className={ styles[visualizationClassName] }>
            { (validVisualizationTypes[0] == 'bar' || validVisualizationTypes[0] == 'hist') &&
              <ColumnChart
                chartId={ `spec-bar-${spec.id}` }
                fieldNames={ spec.args }
                generatingProcedure={ spec.generatingProcedure }
                data={ data }
                options={ options }
                isMinimalView={ isMinimalView }/>
            }
            { (validVisualizationTypes[0] == 'stackedbar' ) &&
              <StackedColumnChart
                chartId={ `spec-stackedbar-${spec.id}` }
                fieldNames={ spec.args }
                generatingProcedure={ spec.generatingProcedure }
                data={ data }
                options={ options }
                isMinimalView={ isMinimalView }/>
            }
            { (validVisualizationTypes[0] == 'scatter' ) &&
              <ScatterChart
                chartId={ `spec-bar-${spec.id}` }
                fieldNames={ spec.args }
                generatingProcedure={ spec.generatingProcedure }
                data={ data }
                options={ options }
                isMinimalView={ isMinimalView }/>
            }
            { validVisualizationTypes[0] == 'pie' &&
              <PieChart
                chartId={ `spec-pie-${spec.id}` }
                generatingProcedure={ spec.generatingProcedure }
                data={ data }
                options={ options }
                isMinimalView={ isMinimalView }/>
            }
            { validVisualizationTypes[0] == 'tree' &&
              <TreeMap
                chartId={ `spec-tree-${spec.id}` }
                parent={ spec.meta.desc }
                generatingProcedure={ spec.generatingProcedure }
                data={ data }
                options={ options }
                isMinimalView={ isMinimalView }/>
            }
          </div>
        }
        { (isMinimalView && (data.length > MAX_ELEMENTS)) &&
          <div className={ styles[overflowTextClassName] }>
            <span>Too many data points to display.</span>
          </div>
        }
      </div>
    );
  }
}

Visualization.propTypes = {
  spec: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  visualizationClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  overflowTextClassName: PropTypes.string,
  isMinimalView: PropTypes.bool,
  onClick: PropTypes.func,
  showHeader: PropTypes.bool,
  visualizationTypes: PropTypes.array
};

Visualization.defaultProps = {
  visualizationClassName: "visualization",
  containerClassName: "block",
  headerClassName: "header",
  overflowTextClassName: "overflowText",
  isMinimalView: false,
  showHeader: false,
  visualizationTypes: []
};
