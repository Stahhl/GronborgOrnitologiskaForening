using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GOF.Models
{
    public class BirdWatch
    {
        public BirdWatch()
        {
            MyComments = new List<Comment>();
        }

        public int Id { get; set; }
        public string PersonName { get; set; }
        public string BirdName { get; set; }
        public string BirdFamily { get; set; }
        public string Location { get; set; }
        public string DateAndTime { get; set; }

        public List<Comment> MyComments { get; set; }
    }
}
