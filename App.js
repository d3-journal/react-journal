
import React, {Fragment, Component} from 'react';
import {db, auth} from './firebase/firebase';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { JournalService } from './service/journal.service'
import { UserService } from './service/user.service'

export default class App extends Component{
  constructor(props) {
    super(props);
    this.journalService = new JournalService(auth,db);
    this.userService = new UserService(auth,db);
    this.journals = [];
    this.journalService.getJournals().then((res)=>{
      console.log(res);
      res.forEach((userdoc) => {
        let info = userdoc.data();
        console.log(info);
        this.journals.push(info);
      });
      const posts = this.journals;
      this.setState({posts});
    }).catch(msg => console.log(msg));
  }
  state = { posts: [] };
  render(){
    console.log('render');
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <FlatList
                data={this.state.posts}
                renderItem={({item}) => <Text style={styles.item}>{item.title + ' ' + item.content}</Text>}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }

}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
