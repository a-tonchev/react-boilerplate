import { Container, Draggable } from 'react-smooth-dnd';
import { Component, useState } from 'react';
import { Grid } from '@mui/material';
import { css } from '@emotion/react';
import './smooth.css';

import { applyDrag, generateItems } from './utils';

export const SimpleSmooth = () => {
  const [items, setItems] = useState([
    { id: '1', gridProps: { xs: 12 } },
    { id: '2', gridProps: { xs: 12 } },
    { id: '3', gridProps: { xs: 12 } },
    { id: '4', gridProps: { xs: 12 } },
    { id: '5', gridProps: { xs: 12 } },
    { id: '6', gridProps: { xs: 12 } },
    { id: '7', gridProps: { xs: 12 } },
    { id: '8', gridProps: { xs: 12 } },
  ]);

  return (
    <Container
      onDrop={e => setItems(applyDrag(items, e))}
      onDragStart={obj => console.log(obj)}
      dragClass=".dragging"
      orientation="vertical"
      style={{
        display: 'flex !Important',
        height: 100,
        overflow: 'scroll',
      }}
      dragHandleSelector=".column-drag-handle"
      render={ref => (
        <Grid container ref={ref} style={{ display: 'flex' }}>{items.map(item => (
          <Draggable
            key={item.id}
            render={ref2 => (
              <Grid
                ref={ref2}
                key={item.id}
                item
                style={{ backgroundColor: 'green', border: '1px solid yellow' }}
                classes={{
                  root: 'custom-drag-item',
                }}
                className="custom-drag-item"
                {...item.gridProps}
              >
                <span
                  className="column-drag-handle"
                  style={{ float: 'left', padding: '0 10px' }}
                >
                  &#x2630;
                </span>
                Grid {item.id}
              </Grid>
            )}
          />
        ))}
        </Grid>
      )}
    />
  );
};

class SmoothDnd extends Component {
  constructor() {
    super();

    this.containerOnDrop = this.containerOnDrop.bind(this);
    this.containerOnDrop2 = this.containerOnDrop2.bind(this);
    this.containerOnDrop3 = this.containerOnDrop3.bind(this);

    const items = generateItems(30, i => ({
      id: i,
      type: 'draggable',
      data: `Container 1 Draggable - ${i}`,
    }));

    const items2 = generateItems(10, i => ({
      id: i,
      type: 'draggable',
      data: `Container 2 Draggable - ${i}`,
    }));

    items2[3] = {
      id: 3,
      type: 'container',
      items: generateItems(4, i => ({
        id: i,
        type: 'draggable',
        data: `Container 4 Draggable - ${i}`,
      })),
    };

    const items3 = generateItems(4, i => ({
      id: i,
      type: 'draggable',
      data: `Container 3 Draggable - ${i}`,
    }));

    items[5] = {
      id: 5,
      type: 'container',
      items: items2,
    };

    items[9] = {
      id: 9,
      type: 'container',
      items: items3,
    };

    this.state = {
      items,
    };
  }

  render() {
    return (
      <div>
        <div className="simple-page">
          <Container onDrop={this.containerOnDrop} groupName="common">
            {this.state.items.map((p, i) => {
              if (p.type === 'draggable') {
                return (
                  <Draggable key={i}>
                    <div className="draggable-item">{p.data}</div>
                  </Draggable>
                );
              }
              return (
                <Draggable key={i}>
                  <div
                    style={{
                      padding: '20px 20px',
                      marginTop: '2px',
                      marginBottom: '2px',
                      border: '1px solid rgba(0,0,0,.125)',
                      backgroundColor: '#fff',
                      cursor: 'move',
                    }}
                  >
                    <h4 style={{ textAlign: 'center' }}>
                      Nested Sortable List - {p.id}
                    </h4>
                    <div style={{ cursor: 'default' }}>
                      <Container onDrop={e => this.containerOnDrop2(i, e)} groupName="common">
                        {p.items.map((q, j) => {
                          if (q.type === 'draggable') {
                            return (
                              <Draggable key={j}>
                                <div
                                  className="draggable-item"
                                  style={{ backgroundColor: 'cornsilk' }}
                                >
                                  {q.data}
                                </div>
                              </Draggable>
                            );
                          }
                          return (
                            <Draggable key={j}>
                              <div
                                style={{
                                  padding: '20px 20px',
                                  marginTop: '2px',
                                  marginBottom: '2px',
                                  border: '1px solid rgba(0,0,0,.125)',
                                  backgroundColor: 'cornsilk',
                                  cursor: 'move',
                                }}
                              >
                                <h4
                                  style={{
                                    textAlign: 'center',
                                  }}
                                >
                                  Nested Sortable List - {q.id}
                                </h4>
                                <div style={{ cursor: 'default' }}>
                                  <Container
                                    onDrop={e => this.containerOnDrop3(i, j, e)}
                                    groupName="common"
                                  >
                                    {q.items.map((t, y) => (
                                      <Draggable key={y}>
                                        <div
                                          className="draggable-item"
                                          style={{
                                            backgroundColor: 'ghostwhite',
                                          }}
                                        >
                                          {t.data}
                                        </div>
                                      </Draggable>
                                    ))}
                                  </Container>
                                </div>
                              </div>
                            </Draggable>
                          );
                        })}
                      </Container>
                    </div>
                  </div>
                </Draggable>
              );
            })}
          </Container>
        </div>
      </div>
    );
  }

  containerOnDrop(e) {
    this.setState({
      items: applyDrag(this.state.items, e),
    });
  }

  containerOnDrop2(id, e) {
    const newItems = [...this.state.items];
    newItems[id].items = applyDrag(newItems[id].items, e);
    this.setState({
      items: newItems,
    });
  }

  containerOnDrop3(id1, id2, e) {
    const newItems = [...this.state.items];
    newItems[id1].items[id2].items = applyDrag(
      newItems[id1].items[id2].items,
      e,
    );
    this.setState({
      items: newItems,
    });
  }
}

SmoothDnd.propTypes = {};

export default SmoothDnd;
