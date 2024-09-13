function ReusableDateFormatter(props) {
    const parts = props.date?.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    
    
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  export default ReusableDateFormatter