using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class PropAmenity
    {
        public int Id { get; set; }
        public int? PropId { get; set; }
        public int? AmId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifedBy { get; set; }

        public virtual Object? Am { get; set; }
        public virtual Property? Prop { get; set; }
    }
}
