using System.ComponentModel.DataAnnotations;

namespace HomeTech.Services.AcceptedRequestApi.Model
{
	public class AcceptRequest
	{
		[Key]
		public int Id { get; set; }
		public int ComplaintId{ get; set; }
		public string Service { get; set; }
		public string Category { get; set; }
		public DateTime Date { get; set; }
		public string CustomerId  { get; set; }
	    public string TechnicianId   { get; set; }
	}
}
