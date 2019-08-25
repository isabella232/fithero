/* @flow */

import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import i18n from '../../utils/i18n';
import withTheme from '../../utils/theme/withTheme';
import { Paragraph, Title } from 'react-native-paper';
import {
  dateToString,
  dateToWorkoutId,
  getDatePrettyFormat,
  getToday,
} from '../../utils/date';
import {
  deleteWorkoutComments,
  getWorkoutComments,
  setWorkoutComments,
} from '../../database/services/WorkoutService';
import type { NavigationType } from '../../types';
import type { ThemeType } from '../../utils/theme/withTheme';
import Screen from '../../components/Screen';

type NavigationObjectType = {
  navigation: NavigationType<{
    day: string,
    saveComments: () => void,
  }>,
};

type Props = NavigationObjectType & {
  theme: ThemeType,
};

type State = {
  comments: string,
};

class CommentsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      comments: getWorkoutComments(
        dateToWorkoutId(this.props.route.params.day)
      ),
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      saveComments: this._saveComments,
    });
  }

  _onCommentsChange = comments => {
    this.setState({ comments });
  };

  _saveComments = () => {
    const { comments } = this.state;
    const workoutId = dateToWorkoutId(this.props.route.params.day);

    if (comments) {
      setWorkoutComments(workoutId, comments);
    } else {
      deleteWorkoutComments(workoutId);
    }

    this.props.navigation.goBack();
  };

  render() {
    const { comments } = this.state;
    const { colors } = this.props.theme;
    const dayString = getDatePrettyFormat(
      this.props.route.params.day,
      dateToString(getToday())
    );

    return (
      <Screen style={styles.screen}>
        <Title style={styles.section}>{i18n.t('workout_notes')}</Title>
        <Paragraph style={styles.section}>{dayString}</Paragraph>
        <TextInput
          autoFocus
          multiline
          underlineColorAndroid="transparent"
          selectionColor={colors.textSelection}
          style={[{ color: colors.text }, styles.textArea]}
          placeholderTextColor={colors.placeholder}
          placeholder={i18n.t('workout_comment__placeholder')}
          value={comments}
          onChangeText={this._onCommentsChange}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 4,
  },
  textArea: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 24,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});

export default withTheme(CommentsScreen);
