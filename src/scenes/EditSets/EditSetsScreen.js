/* @flow */

import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Screen from '../../components/Screen';
import type { NavigationType } from '../../types';
import type { WorkoutExerciseSchemaType } from '../../database/types';
import { getExerciseSchemaId } from '../../database/utils';
import EditSetsWithControls from './EditSetsWithControls';
import EditSetsWithPaper from './EditSetsWithPaper';
import type {
  DefaultUnitSystemType,
  EditSetsScreenType,
} from '../../redux/modules/settings';
import { getWorkoutExerciseById } from '../../database/services/WorkoutExerciseService';
import DataProvider from '../../components/DataProvider';

type Props = {
  editSetsScreenType: EditSetsScreenType,
  navigation: NavigationType<{
    day: string,
    exerciseKey: string,
    exerciseName?: string,
  }>,
  defaultUnitSystem: DefaultUnitSystemType,
};

class EditSetsScreen extends Component<Props> {
  render() {
    const { defaultUnitSystem, navigation } = this.props;
    const {
      day,
      exerciseKey,
      exerciseName,
    } = this.props.navigation.state.params;

    const id = getExerciseSchemaId(day, exerciseKey);

    return (
      <Screen style={styles.container}>
        <DataProvider
          query={getWorkoutExerciseById}
          args={[id]}
          parse={(data: Array<WorkoutExerciseSchemaType>) =>
            data.length > 0 ? data[0] : null
          }
          render={(exercise: ?WorkoutExerciseSchemaType) =>
            this.props.editSetsScreenType === 'list' ? (
              <EditSetsWithControls
                testID="edit-sets-with-controls"
                day={day}
                exerciseKey={exerciseKey}
                exercise={exercise}
                defaultUnitSystem={defaultUnitSystem}
              />
            ) : (
              <EditSetsWithPaper
                testID="edit-sets-with-paper"
                day={day}
                exerciseKey={exerciseKey}
                exerciseName={exerciseName}
                exercise={exercise}
                navigation={navigation}
                defaultUnitSystem={defaultUnitSystem}
              />
            )
          }
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingVertical: 8,
      },
      android: {
        paddingTop: 8,
      },
    }),
  },
});

export default connect(
  state => ({
    editSetsScreenType: state.settings.editSetsScreenType,
    defaultUnitSystem: state.settings.defaultUnitSystem,
  }),
  null
)(EditSetsScreen);
