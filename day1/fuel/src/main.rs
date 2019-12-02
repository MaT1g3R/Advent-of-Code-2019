use std::env;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader};


const USAGE: &str = "Usage: fuel INPUT_FILE";


fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    match args.get(1) {
        None => {
            eprintln!("{}", USAGE);
            std::process::exit(1)
        }
        Some(file_name) => {
            let file = File::open(file_name)?;
            let file = BufReader::new(file);
            let sum = file
                .lines()
                .filter_map(|line| {
                    line.ok().and_then(|parsed| {
                        parsed.parse::<i32>().ok()
                    })
                })
                .map(|i| i / 3 - 2)
                .fold(0, |a, b| a + b);
            println!("{}", sum);
            Ok(())
        }
    }
}
