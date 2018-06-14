import * as React from 'react';
import styles from './Tictactoev3.module.scss';
import { css } from 'office-ui-fabric-react';
import { ITictactoev3Props } from './ITictactoev3Props';
import { escape } from '@microsoft/sp-lodash-subset';


export class Square extends React.Component<any,any> {
  public componentDidMount() {
      
  
  }
  render(){
    return (
      <div className={css("ms-Grid-col ms-u-sm4", styles.squareCont)} 
        onClick={()=>this.props.onSquareClick()}>
        <h2>
          {this.props.value}
        </h2>
      </div>
    );
  }
}

export class Board extends React.Component<any,any> {
  constructor() {
    super();
    
    var p1 = {name:"Player 1", value:"X"}
    var p2 = {name:"Player 2", value:"O"}

    this.state= {
      values: Array(9),
      player1:p1,
      player2:p2,
      currentPlayer:p1
    }
  }

  handleSquareClick(id:number) {
    let vals = this.state.values.slice();

    vals[id] = this.state.currentPlayer.value;
    this.setState({values:vals})

    if(this.state.currentPlayer == this.state.player1){
      this.setState({currentPlayer:this.state.player2})
    }else {
      this.setState({currentPlayer:this.state.player1})
    }

  }
  
  private renderRow(startIndex:number, colCount:number){

    var col = [];

    for(var i=0; i<colCount; i++){

      let index = startIndex;

      col.push(<Square 
        key={index}
        onSquareClick={()=>this.handleSquareClick(index)} 
        value={this.state.values[index]}/>)
      startIndex++
    }

    return(
      <div className="ms-Grid-row">
        {col}
      </div>
    );
  }

  render(){            
    return (
      <div className={css("ms-Grid", styles.gridCont)}>
       <h2>Hello from Board</h2>
       <h3>it is {this.state.currentPlayer.name} turn</h3>
        {this.renderRow(0,3)}
          {this.renderRow(3,3)}
            {this.renderRow(6,3)}
      </div>
    );
  }
}

export class Game extends React.Component<any,any>{

  console = () => {
    console.log("lol")
  }

  render() {
    return(
      <div>
        <h2>Hello from {this.props.name}</h2>
        <Board />
        <span onClick={()=>this.console()}>hola</span>
      </div>
    );
  }
}


export default class Tictactoev3 extends React.Component<ITictactoev3Props, {}> {



  public componentDidMount() {

  }

  public render(): React.ReactElement<ITictactoev3Props> {
    return (
      <div className={ styles.tictactoev3 }>
        <div className={ styles.container }>

          <Game name="Game 1" />

          {/* <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div> */}

        </div>
      </div>
    );
  }
}
