import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container,Header,Item,Input,Text, Button, Icon, Content, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base';
import axios from 'axios';

class App extends Component {

  constructor(){
    super()
    this.state = {isi_data: [], search : ""}
  }

  get = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;

    var config = {
      headers:{'user-key':'dbc7fd1a6a7e3421084c2e0506d5ade4'}
    };

    axios.get(url, config)
    .then((ambilData)=>{
      this.setState({isi_data: ambilData.data.restaurants})
      // console.log(this.state.isi_data[0].restaurant.name);
    })
  }

    render () {

      const data = this.state.isi_data.map((x,index) => {

        var data_nama = x.restaurant.name;
        var data_kota = x.restaurant.location.city;
        var data_alamat = x.restaurant.location.address;
        var data_harga = (x.restaurant.average_cost_for_two/2);
        var data_gambar = x.restaurant.thumb;


        return(
                <Card key = {index} style = {{flex: 0}}>

                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: data_gambar}} />
                      <Body>
                        <Text>{data_nama}</Text>
                        <Text note>{data_kota}</Text>
                      </Body>
                    </Left>

                    <Right>
                      <Text>{data_harga}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Image source = {{uri: data_gambar}} style = {{height: 200, width : 350, flex: 0}} />
                    </Body>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name = "thumbs-up" />
                      <Text>{data_alamat}</Text>
                    </Left>
                  </CardItem>

                </Card>
        )
      })

        return (
            <Container>

              <Header searchBar rounded>
                <Item>
                  <Icon name = "search" />
                  <Input placeholder = "Cari nama makanan" onChangeText={(x)=> {this.setState({search: x})}} value={this.state.form}/>
                </Item>
              </Header>

              <Header>
                <Button block onPress={()=> {this.get()}}>
                  <Text> LIHAT DAFTAR RESTO </Text>
                </Button>
              </Header>

              <Content>
                {data}
              </Content>
            </Container>
        )
    }
}

export default App;