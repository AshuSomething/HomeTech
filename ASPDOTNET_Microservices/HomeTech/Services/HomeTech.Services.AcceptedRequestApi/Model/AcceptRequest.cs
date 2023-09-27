using System.ComponentModel.DataAnnotations;

namespace HomeTech.Services.AcceptedRequestApi.Model
{
	public class AcceptRequest
	{
		[Key]
		public int AcceptRequestId { get; set; }
		public string Service { get; set; }
		public string Category { get; set; }
		public int CustomerId  { get; set; }
	    public int TechnicianId   { get; set; }
	}
}
