using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GOF.Models
{
	public class Comment
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public int BirdWatchId { get; set; }

		//public BirdWatch MyBirdWatch { get; set; }
		public virtual BirdWatch MyBirdWatch { get; set; }
	}
}
