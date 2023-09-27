namespace Stripe
{
	internal class CouponCreateOptions
	{
		public long AmountOff { get; set; }
		public object Name { get; set; }
		public string Currency { get; set; }
		public object Id { get; set; }
	}
}