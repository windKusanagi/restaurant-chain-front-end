import React from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

// function to get average sales of restaurant in renct 12 months
function average(data) {
    // lodash round and sum methods
    return _.round(_.sum(data)/data.length);
}
// Reusable component to draw sparklines according to given array,
// implemented based on react-sparklines
export default (props) => {
    return (
        <div>
            <div> Sales in recent 12 months: ( k$ ) </div>
            <Sparklines height={200} width={240} data={props.data}>
                <SparklinesLine color={props.color} />
                <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div> Average Sales: {average(props.data)} k$ </div>
        </div>
    );

}